# Sonic v1.8 文档源码核对记录（2026-11-02）

本记录供维护者复核隐私政策、用户条款与部署条件。它是静态源码检查，不是生产环境审计、法律意见书或合规认证。文档已据此修订，但以下上游实现问题没有在本次文档工作中修改。

## 1. 版本、范围与方法

| 项目 | 核对结果 |
| --- | --- |
| 上游 | <https://github.com/shijianus/sonic> |
| 默认分支 | `main`，`ce443c801d2eafdbdc53e60b12b088ba3bac4d67`，2026-10-27；本次核验 2026-11-02 |
| 最新公开候选分支 | `rc/sonic-20261031`，`a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8`，2026-11-01 12:33:12 UTC；本次重新核验远端引用及固定源码 |
| 发布与上线状态 | GitHub Releases API 返回空列表；公开候选分支不等于正式 Release，也不能据此确定生产运行版本 |
| 取得方式 | HTTPS `git clone`、`git fetch`、`git ls-remote`；在文档仓库忽略的 `tmp_laws/sonic-upstream` 隔离审阅 |
| 未纳入 | 相邻 Sonic 工作副本的未提交修改、实际线上数据库、密钥、帐号、服务器配置、合同及邮件送达 |
| 验证边界 | 没有对线上帐号登录、抓取私人资料、执行线上删除、发送邮件、修改上游代码或发布站点 |

下文第 2 至第 5 节的源码证据链接固定于公开候选提交 `a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8`。第 7 节另记旧 `main@ce443c8` 的兼容差异；两版均经本次远端引用和固定源码复核。候选版是最新公开代码，不是托管实例已上线该代码的证明，未提交工作副本也不作为上游事实。把 RC 链接中的提交号机械替换为 main 会指向不存在或含义不同的文件，不能用于变更审计范围。

## 2. 必须纠正的现有披露

### 2.1 可选画像默认开启

`personalizationEnabled` 与 `autoDjEnabled` 均为 `true`，匿名标识按需生成并持久化。请求可带 `X-Sonic-Anon-Id`、收藏／艺人／拒绝／搜索上下文及同源会话。没有找到事前独立的肯定同意门槛。服务器称为 `anonymous-opt-in` 不能证明发生了真实 opt-in。

关闭个性化能停止相应客户端新事件、清队列并发送 off 标记，但不删除既有资料、不取消在途请求，也不停止普通查询和另行累计的搜索词。

证据：[recommend.ts:68](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/stores/modules/recommend.ts#L68)、[recommend.ts:337](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/stores/modules/recommend.ts#L337)、[identity.ts:56](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/recommend/identity.ts#L56)。

### 2.2 搜索原文可进入公共建议

智能搜索不依个性化选择，累计 normalized/display query、次数和时间。建议接口可返回这些展示词，未见最低不同用户阈值或个人资料过滤。姓名、邮箱或敏感文本不会因为没有 subject 列而自动匿名；删除行为记录也不删除搜索聚合。

证据：[smart-search.ts:269](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/recommend/smart-search.ts#L269)、[smart-search.ts:57](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/recommend/smart-search.ts#L57)、[recommend-sqlite.ts:515](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/server/recommend-sqlite.ts#L515)。

### 2.3 删除成功提示与实际覆盖不同

前端只看 HTTP 成功，不充分检查 `cleared`；请求失败时仍可能清除本地拒绝记录、轮换匿名标识并显示成功。后端远端不可达但本地 fallback 清除时也可能返回成功。已登录请求优先使用邮箱身份，不覆盖登录前匿名身份。

SQLite 删除覆盖 `behavior_events` 和 `user_entity_feedback`，未覆盖雷达画像、搜索词、共现、其他边缘 isolate、外部推荐、缓存和备份。IndexedDB 被阻挡的删除可能被视为完成。“清除全部本地数据”不清除 HttpOnly Cookie，也不是退出操作；重载后清空设置还可能恢复默认开启画像。

证据：[api/recommend.ts:388](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/api/recommend.ts#L388)、[recommend.ts:346](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/stores/modules/recommend.ts#L346)、[PrivacyDataSection.vue:26](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/components/Settings/PrivacyDataSection.vue#L26)、[events.ts:117](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/api/sonic/events.ts#L117)、[SQL 删除:466](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/server/recommend-sqlite.ts#L466)、[IndexedDB:46](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/utils/indexedDB.ts#L46)。

### 2.4 “90 日自动销毁”不是准确实现说明

启动清理读取默认 90、最低 7 日的配置；每 1,500 次行为写入调用 `pruneRetention()` 时未传配置，回到固定 90 日。只有实体反馈的写入不增加该计数，未见定时器，错误被忽略。清理同样不覆盖雷达／搜索聚合等。内存 fallback 主要按容量淘汰。

SQL 删除不等于 WAL、空闲页、备份物理擦除。备份用 `VACUUM INTO` 复制完整库，没有统一过期任务；恢复会保留恢复前快照，未找到删除记录重放机制。

证据：[WAL:45](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/server/recommend-sqlite.ts#L45)、[写入清理:437](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/server/recommend-sqlite.ts#L437)、[清理覆盖:762](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/server/recommend-sqlite.ts#L762)、[启动配置:917](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/server/recommend-sqlite.ts#L917)、[backup:8](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/scripts/backup-recommend-db.mjs#L8)、[restore:46](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/scripts/restore-recommend-db.mjs#L46)。

### 2.5 第三方直连与邮箱头像

构建入口自动加载 Google Fonts。封面通常先直连，失败再代理；MV／HLS／poster 直接使用返回地址；评论头像及表情图片也会外连。身份重建生成的 DiceBear 头像 URL 以 URL 编码的明文邮箱作为 `seed`。`no-referrer` 不隐藏 IP，也不隐藏 URL 内的邮箱。

证据：[Google Fonts:24](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/index.html#L24)、[LazyImage:56](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/components/Ui/LazyImage.vue#L56)、[DiceBear:788](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/auth.ts#L788)、[Artplayer:45](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/components/Artplayer.vue#L45)、[评论图片:1577](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/pages/mv-player.vue#L1577)。

## 3. 数据清单补正

| 类别 | 本次核对事实 |
| --- | --- |
| 本地帐号 | `auth` 持久化用户 ID、邮箱、昵称、头像、角色；不能称帐号资料均不落盘 |
| 会话 | `sonic_session` 默认 30 日，签名非加密；载荷含邮箱及身份／令牌字段；本地 HTTP 开发环境不一定有 Secure |
| OAuth | `openid profile email`，事务 Cookie 600 秒；userinfo 仅明确 false 的验证标记被拒绝，缺少标记仍接受；未发现生日或年龄核验 |
| 偏好与文件 | audio/library/global/settings/recommend/auth/radarAlbum/local comments 等 localStorage；搜索历史为最多 20 项；IndexedDB 保存音频文件主体、元数据及封面 |
| 本地音乐 | 未见导入音频主体上传；标题等元数据及 data URL 内嵌封面可随收藏事件进入共享曲目目录，见第 8.1 节，不能承诺全部信息从不发送 |
| 身份哈希 | 确定性 SHA-256、固定公开前缀、截取 12 字节／24 十六进制位；不是加盐匿名化，另有非密码学 fallback |
| 事件 | API 接受 15 种 action；声明支持不等于全部前端有发送；新增实体反馈可存原始客户端 context JSON |
| 访问副本 | GET events 为有限画像摘要，没有核实完整个人资料或可携带导出 |
| 评论 | 上游包含他人昵称、头像、ID、正文、时间及图片；所谓 desensitize 只替换品牌，非匿名化；响应可公开缓存。当前用户评论／回复／点赞的写入为浏览器本地模拟 |

证据：[auth 持久化:199](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/stores/modules/auth.ts#L199)、[OAuth:264](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/auth.ts#L264)、[凭证:624](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/auth.ts#L624)、[本地导入:24](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/stores/modules/localMusic.ts#L24)、[歌词参数:261](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/composables/useLyrics.ts#L261)、[哈希:8](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/recommend/identity.ts#L8)、[15 actions:21](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/api/sonic/events.ts#L21)、[context:126](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/recommend/engine.ts#L126)、[local comments:12](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/utils/localCommentDB.ts#L12)、[评论抓取:830](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/upstream.ts#L830)。

## 4. 雷达、网络和第三方配置

雷达前端尝试上传专辑、最多 16 曲和信号，Pages handler 可写 isolate memory。标准 Node dispatcher 未注册 radar-album 路由，engine 转发失败仍可能返回 ok；SQLite 虽有表和方法，不代表当前标准路由已实现持久云同步。不能许诺通用跨设备恢复或完整删除。

证据：[radarAlbum:419](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/stores/modules/radarAlbum.ts#L419)、[handler:105](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/api/sonic/recommend/radar-album.ts#L105)、[dispatcher:202](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/server/index.ts#L202)。

| 项目 | 核对结果 |
| --- | --- |
| 数据面位置 | Node 默认回环 8080；Docker 对宿主默认回环映射，SQLite Compose 路径 `/app/data/sonic-recommend.sqlite`，不能据此判定国家 |
| 内部转发 | 边缘向配置引擎转发真实客户端 IP、完整 Cookie、Authorization、匿名及偏好/context 标头 |
| 限流 | 匿名键含原始 IP；KV TTL 120 秒，内存 60 秒是计数窗口不是物理删除保证；原生设施期限待核实 |
| 日志 | Node 普通访问日志最小化，但不能代替 Cloudflare、sidecar、代理、宿主、错误及第三方日志核验 |
| 音频代理 | 默认代理，可显式 redirect；代理仍可转发浏览器 User-Agent，不总是固定 UA |
| 上游 | 网易、QQ、酷狗、酷我、AMLL、LRCLIB 等有请求路径；部分酷狗／酷我查询使用明文 HTTP；注册表 APPROVED 不是内容许可证明 |
| GDStudio | `licensing.ts` 未设置变量时为 ON，`.env.example` 和 Compose 显式 OFF；不得称统一默认关闭 |
| 外部推荐 | Gorse 可接收 subject/track/feedback/time；Meilisearch 接收查询和目录；未见 Gorse 删除同步；目的地和 HTTP/TLS 依配置 |
| 撤销 | 清 Cookie 与服务端作废不同；即时撤销依 KV 与开关，存在缓存传播；导出凭证不保证登出即全局失效 |

证据：[forward:157](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/local-engine.ts#L157)、[rate limit:348](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/security.ts#L348)、[日志:329](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/server/index.ts#L329)、[stream:276](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/api/music/stream.ts#L276)、[开关:313](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/licensing.ts#L313)、[HTTP:367](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/native-protocols.ts#L367)、[外部适配:68](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/recommend/external-adapters.ts#L68)、[logout:28](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/api/auth/logout.ts#L28)。

## 5. 许可、角色与文档原则

核对版本的 [根许可证](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/LICENSE) 及 [播放器许可证](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/LICENSE) 为 MIT；README 的历史 CC／非商业意图有歧义，不得据此一概禁止 MIT 许可的商业代码使用。代码许可与音乐等内容许可分开判断。

本次以用户说明的个人、非营利、免费学习项目定位拟定服务范围，移除对全球全面 GDPR 合同保证及未核实台湾主体／法院的推定，保留依法不能排除的责任。开发者不因开源而自动成为所有独立实例的运营者；共同决定实际处理时仍按功能角色判断。

## 6. 面向适用欧盟规则的用户处理前，尚须完成

1. 公开实际控制者身份及有效联系资料，确认部署版本、节点国家和实际接收者；按具体条件判断欧盟代表、DPO、处理记录和高风险评估。
2. 让可选画像在事前有效选择前不创建非必要标识、不发送相关数据；同意与登录／条款接受分开，拒绝及撤回同样便捷，测试清空设置后行为。
3. 暂停不受控的用户搜索词公共复用，完成过滤、依据、期限和删除；防止邮箱通过头像 URL 泄露，控制第三方自动资源。
4. 完成跨身份、雷达、外部存储、备份等的删除处理；真实报告失败、保留重试关联信息，提供完整访问／可携请求路径。
5. 统一保留配置和周期清理，给所有可关联数据设必要期限；规定日志、备份及恢复后删除重放流程，不以无限保存替代缺少任务。
6. 核对供应商实际合同与跨境机制，按需要评估补充保障；对未具备依据或安全措施的传输暂停相应功能。修复不安全传输，验证凭证撤销和雷达路由。

以上是实际落实条件，不是要求个人开发者一概采购商业认证、专职团队或企业 SLA。未落实时应收缩／暂停相关处理，不能以“测试免责”“继续使用即同意”或新政策文字代替实施。

## 7. v1.7 重新核对：旧主线与候选版不能混用

本轮通过 `git ls-remote`、GitHub 公开元数据和固定提交文件复核。默认主线仍是 `ce443c8`，最新公开候选仍是 `a75f5cb`；GitHub Releases API 返回空列表，不能写成正式版本已经发布。相邻工作树未提交内容不纳入本结论。

| 事项 | 旧主线 `ce443c8` | 候选版 `a75f5cb` |
| --- | --- | --- |
| 登录事务 | 有 OAuth code 交换，但未实现同一套 PKCE／state Cookie 校验 | 有 state Cookie 校验、PKCE 和短效事务 Cookie |
| 凭证传递 | 回调和兼容前端存在 URL fragment 传递与 localStorage 保存；保护不足，不应据 README 声称已完成安全认证 | 默认重定向通过 HttpOnly Cookie 建立会话；JSON 回调和独立接口仍可返回可导出凭证 |
| 退出与撤销 | 未发现候选版的远端退出／撤销工具 | 清 Cookie 不等于全部导出凭证立即失效；撤销依 KV 等实际配置 |
| 本地身份 | 兼容入口保存身份及凭证 | 持久化部分用户资料，并仍可读取旧存储恢复显示；显示身份不等于后端验证成功 |
| 推荐与保存 | 未找到候选版完整的事件、SQLite 画像或远端删除实现 | 有这些路径，但默认开启、清理／删除不完整，见前文 |
| 许可 | 可核验播放器 MIT 文件；根目录无 LICENSE，历史元数据相互不一致 | 根目录及播放器 MIT 文件存在；不能反推全部历史代码许可 |

旧版证据：[认证模块](https://github.com/shijianus/sonic/blob/ce443c801d2eafdbdc53e60b12b088ba3bac4d67/functions/_lib/auth.ts)、[回调资料传递](https://github.com/shijianus/sonic/blob/ce443c801d2eafdbdc53e60b12b088ba3bac4d67/functions/api/auth/callback.ts#L35-L46)、[兼容前端保存](https://github.com/shijianus/sonic/blob/ce443c801d2eafdbdc53e60b12b088ba3bac4d67/js/index.js#L4475-L4518)。这些为防御性披露与升级核对，不含重现或利用步骤。

候选版证据：[登录事务](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/api/auth/login.ts#L72-L100)、[正常与 JSON 回调](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/api/auth/callback.ts#L150-L179)、[会话 Cookie](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/auth.ts#L230-L242)、[退出边界](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/api/auth/logout.ts#L28-L60)、[旧存储兼容](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/stores/modules/auth.ts#L76-L154)。

本轮用户条款新增条件式消费者撤回、供应／符合性／安全更新、变更通知与终止、非个人内容取回及不公平条款效力说明；隐私政策新增间接来源、第三方评论处理、支持／争议依据及旧主线差异。均不声称运营者身份、控制措施、实际保存期限或供应商合同已落实。

### 7.1 可选接收者补查

候选版保留 Musixmatch 请求代码，但其实际调用受 `isSourceEnabledByPolicy` 判断阻止，不能据注册表的默认标签列为已启用或仅靠普通开关即可启用。旧主线的歌词 fallback 则存在不同路径。证据：[候选调用门槛](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/music.ts#L1798-L1807)、[实际策略判断](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/licensing.ts#L361-L403)。

配置有效 `SONIC_ALERT_WEBHOOK_URL` 并触发告警时，候选版可发送系统计数、发布信息、时间及凭证脱敏后的摘要；常规载荷没有自动附加终端用户 IP、邮箱、标识或查询，接收者仍能看到发送节点出口 IP。管理员备注和错误信息可以进入摘要，现有脱敏不等于通用匿名化。不能把 Slack、Discord 等任意示例当作实际供应商，也不能声称所有告警绝无个人资料。证据：[载荷及发送](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/observability.ts#L515-L574)、[备注](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/api/sonic/engine/metrics.ts#L38-L47)、[错误摘要](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/api/sonic/engine/health.ts#L49-L84)。

## 8. v1.8 增量核对与勘误

本轮重新执行 `git fetch origin '+refs/heads/*:refs/remotes/origin/*'`、按提交时间排序全部远端分支，并核对公开 Releases API。最新公开提交仍为 `rc/sonic-20261031@a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8`，默认 `main` 仍为 `ce443c801d2eafdbdc53e60b12b088ba3bac4d67`，Releases 返回空数组。隔离副本无本地修改，未运行应用或读写生产资料。下列勘误优先于旧交付报告中的概括说法。

### 8.1 本地内嵌封面不保证仅在设备

本地音频 Blob 主体未见上传路径，但 `localMusic.ts` 把内嵌封面转成图片 data URL；收藏及取消收藏的事件没有排除本地曲目，并带上 `cover`。请求未超过 64 KiB 等处理限制时，图片内容可以传输。不能再承诺“本地文件主体及内嵌封面始终留在设备”。

这些事件中的曲目信息先经 canonical upsert 写入 `canonical_tracks`、平台关联及 FTS；cover 不过滤 data URL。共享目录可供全站搜索、建议及推荐返回；当前身份重置与事件保留清理不删除该目录。是否构成个人资料须按图片、文字与其他信息的可关联性判断，不能把目录标签作为匿名证明。

证据：[localMusic.ts:53-L60](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/stores/modules/localMusic.ts#L53-L60)、[library.ts:100-L146](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/stores/modules/library.ts#L100-L146)、[发送:373-L380](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/api/recommend.ts#L373-L380)、[engine.ts:207-L212](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/recommend/engine.ts#L207-L212)、[canonical:177-L217](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/recommend/track-canonical.ts#L177-L217)、[SQLite:218-L278](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/server/recommend-sqlite.ts#L218-L278)、[建议:102-L117](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/recommend/smart-search.ts#L102-L117)。删除和清理范围仍见本记录第 2.3、2.4 节。

### 8.2 关闭画像、停止发送与清除历史是不同事项

本地播放历史自动保存最近最多 100 首，搜索历史最多 20 条，未见独立关闭本地播放历史的开关。个性化开启时，上下文可取本地收藏、最近艺人和最多 8 条搜索历史；画像重置不清除这些全部来源，后续仍可能再次发送。

Auto DJ 仅检查自己的开关；个性化关闭后仍可能把当前曲目 ID／标题／艺人及最多 15 个排除 ID 放入请求 URL。雷达已登录同步函数未先检查画像开关，可发送最多 16 曲、封面和 signals；关闭标记使所审服务端在保存前拒绝，不代表内容没有到达实例。`signals.totalReplays` 实际取曲目数量，`recentQueries` 在该 store 中仅初始化为空，本次未找到填入路径，不应把字段名误作真实收集内容。

证据：[播放历史:1618-L1634](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/stores/modules/audio.ts#L1618-L1634)、[搜索历史:70-L98](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/stores/modules/global.ts#L70-L98)、[上下文:110-L147](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/stores/modules/recommend.ts#L110-L147)、[Auto DJ:315-L330](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/stores/modules/recommend.ts#L315-L330)、[请求:168-L178](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/api/recommend.ts#L168-L178)、[雷达:419-L454](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/player/src/stores/modules/radarAlbum.ts#L419-L454)、[入库前拒绝:105-L111](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/api/sonic/recommend/radar-album.ts#L105-L111)。

### 8.3 Gorse 还有曲目目录输入

除 subject、曲目 ID、反馈类型与时间外，Gorse 可接收曲目目录，包括由标题／艺人组成的 Comment、分类、语言／版本、流派、标签和更新时间。反馈映射只覆盖部分 action，不能写成所有事件都会同步。Meilisearch 查询输入为 simplified 或原查询及 limit，目录另行同步；不能因此保证不可识别，也不能声称查询载荷必含 subject。

证据：[目录:49-L59](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/recommend/external-adapters.ts#L49-L59)、[反馈:27-L38](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/recommend/external-adapters.ts#L27-L38)、[反馈载荷:84-L94](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/recommend/external-adapters.ts#L84-L94)、[Meilisearch:210-L215](https://github.com/shijianus/sonic/blob/a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8/functions/_lib/sonic/recommend/external-adapters.ts#L210-L215)。

### 8.4 联系邮箱来源与文档站

未在受审 RC、main 的源码、README、公开文档及包元数据找到 `privacy@epocanvas.com` 或 `admin@epocanvas.com`。这两个地址来自本法律文档仓库，属于待运营者确认的拟用渠道，不是已由上游公告且核验送达的事实；未发送测试邮件。品牌作者字段、版权署名和域名不能替代控制者法定身份。

本站当前 Starlight 组件读取／写入 localStorage 的 `starlight-theme`；sessionStorage 的 `sl-sidebar-state` 保存侧栏结构、展开与滚动。Pagefind 在浏览器内匹配输入，但请求本站静态索引／结果片段；原始词未见被提交至播放器或外部搜索接口，不代表托管网络无法通过连接记录推断搜索行为。语言入口读取 `Accept-Language`，没有为该入口设置语言 Cookie。上述为依赖及本仓库源码事实，不证明线上无注入脚本、无日志、无需任何终端同意或已核实托管期限。

本地证据：`node_modules/@astrojs/starlight/components/ThemeSelect.astro:28-68`、`SidebarPersistState.ts:5-49`、`Search.astro:135-155`，构建的 `dist/pagefind/pagefind.js` 按 hash 获取 index／fragment，以及 `functions/_lib.js:18-59`。

