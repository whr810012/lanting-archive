import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'pages');

const shell = (page, total, title, body, extra = '') => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/archive.css">
</head>
<body data-page="${page}" data-total="${total}"${extra}>
  <article class="doc-content">${body}</article>
  <script src="../js/progress.js"></script>
  <script src="../js/auth.js"></script>
  <script src="../js/search.js"></script>
  <script src="../js/layout.js"></script>
  <script src="../js/interactions.js"></script>
</body>
</html>`;

const pages = {
  '02': shell('02', '45', '检索帮助', `
    <h1>检索帮助</h1>
    <p>常见检索示例：员工姓名、日期八位数、M-编号。</p>
    <p>新人照护员请从员工档案开始。可搜索 <strong>管理员账号</strong> 了解登录方式。</p>`),

  '03': shell('03', '45', '员工档案：沈屿', `
    <h1>员工档案：沈屿</h1>
    <table class="data">
      <tr><th>工号</th><td>LT-2026-089</td></tr>
      <tr><th>岗位</th><td>夜班照护员（试用）</td></tr>
      <tr><th>入职</th><td>2026-03-09</td></tr>
      <tr><th>上级</th><td>顾临川（信息科）</td></tr>
      <tr><th>紧急联系人</th><td>沈攸</td></tr>
    </table>
    <p class="note">备注：「小伙子话不多，夜班肯吃苦。顾主任亲自批的条子。」</p>`),

  '04': shell('04', '45', '考勤记录', `
    <h1>考勤：2026-03-09 ～ 03-14</h1>
    <table class="data">
      <tr><th>日期</th><th>签到</th><th>签退</th><th>备注</th></tr>
      <tr><td>03-13</td><td>20:00</td><td>—</td><td class="horror"><strong>未签退</strong></td></tr>
      <tr><td>03-14</td><td>—</td><td>—</td><td class="horror"><strong>缺勤</strong></td></tr>
    </table>
    <p>可搜索 <strong>20260313</strong> 查看当夜日志。</p>`),

  '05': shell('05', '45', '夜班日志摘录', `
    <h1>夜班日志（沈屿笔迹 OCR）</h1>
    <blockquote>
      3月13日 夜<br>
      7号楼比别的楼冷。302周爷爷半夜起来，说有人站在床尾看他。<br>
      顾主任说：「别乱看，老人糊涂。」<br>
      但我在收发室看见慧忆的人又拉了一箱试剂。标签：<strong>M-027</strong>。<br>
      周德明爷爷的档案编号，也是 M-027。
    </blockquote>`),

  '06': shell('06', '45', '样本 M-027', `
    <h1>样本标签 M-027</h1>
    <div class="scan-line">
      <p>磁带 A：许文兰，2025-11-03 离世前夜</p>
      <p>磁带 B：周德明，2026-03-12</p>
      <p class="handwritten">顾临川批注：「同一编号，别浪费。」</p>
    </div>
    <p class="horror">系统标记：<strong>样本冲突</strong></p>`),

  '07': shell('07', '45', '许文兰档案', `
    <h1>住户档案：许文兰</h1>
    <p>原住户 5-106 · 离世日期 2025-11-03</p>
    <div class="stamp">在院 · 认知良好</div>
    <p class="handwritten horror">2026-03-16 手写涂改。改笔迹：顾临川。</p>
    <p class="note">边注：「家属还在交管理费。人走了，账不能走。」</p>`),

  '08': shell('08', '45', '访客登记', `
    <h1>访客登记 2026-03-13</h1>
    <table class="data">
      <tr><th>时间</th><th>姓名</th><th>单位</th></tr>
      <tr><td>22:10</td><td>程帆</td><td>慧忆生物</td></tr>
      <tr><td>23:55</td><td>未知</td><td>车牌江岳·K7***</td></tr>
    </table>
    <p>搜索 <strong>20260313</strong> 可回看当夜其他记录。</p>`),

  '09': shell('09', '45', '监控缺失说明', `
    <h1>7号楼监控缺失说明</h1>
    <p>时段：2026-03-15 02:05 ～ 02:17 · 文件损坏（人为删除）</p>
    <p>申请恢复：沈屿（23:52）· 审批：<strong>顾临川</strong> —— 驳回</p>
    <p class="note">驳回理由：「不必要的恐慌。」</p>
    <p>可搜索 <strong>监控</strong> 查看关联条目。</p>`),

  '10': shell('10', '45', '管理员账号', `
    <h1>管理员账号使用方法</h1>
    <p>初始密码与账号名相同。请前往 <a href="../archive/login.html">登录页</a>。</p>
    <p>可搜索 <strong>20190801</strong> 进入时光塔查看关停公告。</p>`),

  '11': shell('11', '45', '2019关停公告', `
    <h1>2019-08-01 关停公告（时光塔快照）</h1>
    <p>因消防设施设备未达标准，本院暂停新入住。现有住户转移合作医院。</p>
    <p>照护档案系统转入 <strong>内部维护</strong> 模式。联系人：顾临川。</p>
    <p>可搜索 <strong>守望者</strong>、<strong>林晚晴</strong>。</p>`),

  '12': shell('12', '45', '守望者', `
    <h1>「守望者」夜班制度（内部备忘）</h1>
    <blockquote>
      2019年关停那晚，顾临川对老人说：「值夜的人还在，你们就还在。」<br>
      后来谎要圆，就有人穿<strong>死去护工</strong>的制服巡楼。<br>
      每月一人。名单不在编制内。
    </blockquote>
    <p class="horror">这不是程序。是人。</p>`),

  '13': shell('13', '45', '2026异常更新', `
    <h1>2026-03-16 手工改档记录</h1>
    <table class="data">
      <tr><td>04:02</td><td>顾临川 登录</td><td>修改 许文兰 状态</td></tr>
      <tr><td>04:15</td><td>程帆</td><td>取走 M-027-B 磁带</td></tr>
      <tr><td>04:19</td><td>手工新增</td><td>巡房记录「沈屿」— 笔迹非本人</td></tr>
    </table>
    <p>沈屿当夜去向登记为：<strong>醒酒</strong>。</p>`),

  '14': shell('14', '45', '半块二维码', `
    <h1>二维码残片</h1>
    <p>【图片占位：半块二维码】</p>
    <p>另一半在护士长办公室公告栏。登录护士长账号后可访问慧忆博客镜像。</p>
    <p>搜索 <strong>帆影</strong> 或 <strong>7号楼</strong>。</p>`),

  '15': shell('15', '45', '沈屿私信草稿', `
    <h1>沈屿未发送草稿</h1>
    <blockquote class="horror">
      姐，如果你能看到——别来找我。<br>
      许奶奶去年就走了，系统里她昨天还在笑。<br>
      我要把3月15日的监控导出来。<br>
      如果我没回来，搜 <strong>7号楼</strong> 和 <strong>北门</strong>。
    </blockquote>`),

  '16': shell('16', '45', '虚拟巡房', `
    <h1>2026-03-14 巡房记录（异常）</h1>
    <p>系统显示沈屿已完成巡房。当日未到岗。</p>
    <p class="horror">备注手写：「<strong>代班</strong>」。签名无法辨认。</p>
    <p>可搜索 <strong>302</strong>、<strong>平面图</strong>。</p>`),

  '17': shell('17', '45', '住户名单', `
    <h1>住户名单摘录</h1>
    <table class="data">
      <tr><th>房号</th><th>姓名</th><th>状态</th></tr>
      <tr><td>7-302</td><td>周德明</td><td>在院</td></tr>
      <tr><td>5-106</td><td>许文兰</td><td class="horror">在院（？）</td></tr>
    </table>
    <p>可搜索 <strong>周德明</strong>。</p>`),

  '18': shell('18', '45', '慧忆汤', `
    <h1>药物收发记录</h1>
    <p>2026-03-12 慧忆生物 试剂箱 ×1 · 签收程帆</p>
    <p>内容物：<strong>慧忆汤</strong>（原标签 CB-3 认知诱导剂）</p>
    <p class="note">林晚晴批注：「按顾主任吩咐，不要登记在院务账本。」</p>`),

  '19': shell('19', '45', '周德明日记', `
    <h1>照护记录：周德明</h1>
    <blockquote>
      三月十二日 阴<br>
      今晚又来了。不是我死去的爸。那个人站着不动。<br>
      护工小子后来脸色很差。他问我刚才说了什么。<br>
      我说不出口。嘴里有<strong>别的词</strong>。像文兰奶奶的声音。
    </blockquote>`),

  '20': shell('20', '45', '林晚晴笔记', `
    <h1>林晚晴工作笔记（扫描）</h1>
    <p>顾临川说守望者只是在补漏洞。现在漏洞是人。</p>
    <p>护士长账号：<strong>gulinchuan</strong> / 密码离职年+院名缩写。</p>
    <p class="note">请前往登录页。登录后可搜索 7号楼 相关档案。</p>`),

  '21': shell('21', '45', '7号楼异常', `
    <h1>7号楼异常汇总</h1>
    <ul>
      <li>温度传感器常年偏低 2℃</li>
      <li>302 房夜间用电波动</li>
      <li>2026-03-15 监控缺失 12 分钟</li>
      <li><strong>北门</strong>货运通道 02:20 开启（无影像）</li>
    </ul>
    <p>搜索 <strong>平面图</strong> 查看楼层示意。</p>`),

  '22': shell('22', '45', '7号楼平面图', `
    <h1>7号楼平面图</h1>
    <div class="floor-plan">
      3F: 301 | <span id="hotspot-302" class="hotspot">302 周德明</span> | 303 | 储物间<br>
      2F: 值班室 | 监控室<br>
      1F: 大门
    </div>
    <p class="note">长按 <strong>302</strong> 房门 5 秒，可解锁隐藏档案。</p>`, ' data-cold="true"'),

  '23': shell('23', '45', '监控室门禁', `
    <h1>监控室门禁记录</h1>
    <table class="data">
      <tr><td>03-14 23:48</td><td>沈屿 进入</td></tr>
      <tr><td>03-14 23:53</td><td>顾临川 远程驳回导出</td></tr>
      <tr><td>03-15 02:06</td><td class="horror">未知卡号 进入（已注销卡）</td></tr>
    </table>`),

  '24': shell('24', '45', '监控转录', `
    <h1>监控文字转录（残缺）</h1>
    <div class="transcript">[02:08] 沈屿：「她明明已经——」
<span class="stage">[02:09] 周德明（苍老女声）：「文兰记得……文兰都记得……」</span>
<span class="stage">（咀嚼声。很长。）</span>
[02:11] 制服人影背对镜头。肩章姓名：<span class="horror">刘海生（已故护工）</span>
[02:12] 信号中断。</div>`),

  '25': shell('25', '45', '隐藏监控帧', `
    <h1>隐藏档案：监控单帧 OCR</h1>
    <p>货运通道指示牌：<strong>北门 · 慧忆冷链</strong></p>
    <p>地面反光车牌：江岳 K7</p>
    <p class="horror">沈屿被两人夹行，未反抗。</p>
    <p>搜索 <strong>北门仓库</strong>、<strong>程帆</strong>。</p>`),

  '26': shell('26', '45', '通话转写', `
    <h1>通话记录（来源不明）</h1>
    <blockquote>
      A（顾）：「他只是复制了日志，还没传出去。」<br>
      B（程）：「慧忆要的是完整性。少一个人，样本链就断了。」<br>
      A：「人可以没有。档案不能没有。」
    </blockquote>`),

  '27': shell('27', '45', '沈屿物品', `
    <h1>沈屿物品清点</h1>
    <ul>
      <li>工牌、撕毁三页的笔记本</li>
      <li><strong>U盘</strong>（损坏）</li>
      <li>纸条（系统地址）</li>
      <li><strong>手机</strong>：SIM 卡在值班室垃圾桶发现，已折断</li>
    </ul>
    <p>搜索 <strong>慧忆生物</strong> 进入外包线。</p>`),

  '28': shell('28', '45', '慧忆生物', `
    <h1>外包合作入口</h1>
    <p>慧忆生物科技有限公司 · 记忆守护计划 Phase 2</p>
    <p>外包顾问请使用 huiyi 账号登录后搜索 <strong>记忆守护</strong>。</p>
    <p><a href="../external/huiyi-blog/index.html">帆影笔记（内网镜像）</a></p>`),

  '29': shell('29', '45', '合作合同', `
    <h1>合作合同摘要</h1>
    <p>甲方：澜庭老年公寓（顾临川代签）</p>
    <p>乙方：慧忆生物科技有限公司</p>
    <p>乙方有权远程查阅照护档案中的 <strong>记忆守护</strong> 相关条目。</p>
    <p>搜索 <strong>CB-3</strong> 或 <strong>样本链</strong>。</p>`),

  '30': shell('30', '45', '慧忆汤说明', `
    <h1>慧忆汤（CB-3）说明</h1>
    <p>用途：诱发临终回忆口述，由护工录音编号。</p>
    <p>副作用：短期失忆、重复他人语句。</p>
    <p class="horror">伦理批件：无。</p>`),

  '31': shell('31', '45', '程帆邮件', `
    <h1>内部邮件：程帆</h1>
    <blockquote>
      「守望者」的制服能让老人安静。样本链不能断。<br>
      沈屿必须变成「醒酒」，不能变成举报人。
    </blockquote>
    <p>搜索 <strong>方案B</strong>。</p>`),

  '32': shell('32', '45', '方案B', `
    <h1>2026-03-15 夜班记录</h1>
    <table class="data">
      <tr><td>02:20</td><td>北门入库 样本箱</td></tr>
      <tr><td>02:33</td><td class="horror"><strong>方案B</strong>：带入仓库「醒酒」</td></tr>
      <tr><td>02:40</td><td>监控删除 — 顾临川</td></tr>
    </table>
    <p>博客密码提示：项目启动日 20230412。搜索或访问 <a href="../external/huiyi-blog/index.html">帆影笔记</a>。</p>`),

  '33': shell('33', '45', '博客引导', `
    <h1>外部备案：帆影笔记</h1>
    <p>程帆停更博客的内网镜像。密码链：</p>
    <ol>
      <li>20230412 → 第一篇</li>
      <li><strong>归档</strong> → 第二篇</li>
      <li>31415926 → 第三篇</li>
      <li>页脚星标长按 5 秒 → 第四篇 → 密码 <strong>beimen1998</strong></li>
    </ol>`),

  '34': shell('34', '45', '给调查者', `
    <h1>给调查者（博客隐藏）</h1>
    <blockquote>
      北门仓库钥匙密码：<strong>beimen1998</strong>。<br>
      里面只有纸质出库单。电子版都被顾临川烧了。<br>
      顾临川不是坏人。他只是怕澜庭的名字烂掉。
    </blockquote>
    <p id="footer-star" title="长按5秒" style="cursor:pointer;margin-top:20px;">★</p>`),

  '35': shell('35', '45', '街景谜题', `
    <h1>澜庭路周边商铺（监控截图）</h1>
    <div class="shop-grid">
      <div class="shop-card"><strong>盛</strong>澜超市</div>
      <div class="shop-card"><strong>庭</strong>前花店</div>
      <div class="shop-card"><strong>慧</strong>心大药房</div>
      <div class="shop-card"><strong>忆</strong>旧五金</div>
    </div>
    <p>取每店首字组合搜索：<strong>盛庭慧忆</strong> 或 <strong>澜庭慧忆北门</strong></p>`),

  '36': shell('36', '45', '北门仓库', `
    <h1>北门仓库出库单</h1>
    <p>2026-03-15 02:22 · 冷链样本箱 M-027 ×2</p>
    <p class="horror">经手人签名「沈屿」— <strong>笔迹不符</strong></p>
    <p class="handwritten">附条（沈屿）：「签名是假的。我还活着。他们在302等我变成下一条M。」</p>
    <p>搜索 <strong>夜班真相</strong>。</p>`),

  '37': shell('37', '45', '守望者守则', `
    <h1>守望者守则（顾临川手书）</h1>
    <ol>
      <li>穿制服者不开口</li>
      <li>老人问话，点头即可</li>
      <li>7号楼不照手电</li>
      <li>北门的事，别问</li>
    </ol>`),

  '38': shell('38', '45', '顾临川自白', `
    <h1>顾临川自白（录音转写）</h1>
    <blockquote class="horror">
      沈屿导出的是周爷爷的记忆，还有许奶奶死后被复用的那部分。<br>
      我删监控，不是想害他。是江岳只有这么大，澜庭倒了，老人就没地方可去。<br>
      沈屿现在在哪？可能在 7-302。也可能——在磁带里。<br>
      搜索 <strong>我该怎么办</strong>。
    </blockquote>`),

  '39': shell('39', '45', '烧档条件', `
    <h1>顾临川私信（未发送）</h1>
    <p>你若烧掉 2019 年后的手写页，我告诉你铁床坐标。</p>
    <p>或在最终页选择 <strong>烧掉</strong> 或 <strong>公开</strong>。</p>`),

  '40': shell('40', '45', '夜班真相', `
    <h1>夜班真相</h1>
    <p>「守望者」是谎。「醒酒」是关人。M-027 是掠夺。</p>
    <p>许文兰的声音住在周德明嘴里。沈屿的工牌曾被人挂在床边——脸不是他的。</p>
    <p class="horror">没有鬼。只有活人装鬼，和表格里不肯死掉的名字。</p>
    <p>搜索 <strong>我该怎么办</strong>。</p>`),

  '41': shell('41', '45', '7-302 状态', `
    <h1>7-302 查房记录</h1>
    <p>周德明：清醒。瞳孔不对。正在背许文兰的生平。</p>
    <p class="horror">床边坐着的人穿着沈屿的工牌。脸不是沈屿。</p>
    <p>档案栏询问：是否将沈屿并入 M-027 样本链？</p>
    <p>（这是顾临川设的模板，不是机器。）</p>`),

  '42': shell('42', '45', '沈攸独白', `
    <h1>——</h1>
    <blockquote>
      这不是医学。是把活人最后的东西榨干，再把名字留给下一个人。<br>
      沈屿，如果你还能听见——我会选。
    </blockquote>
    <p>搜索 <strong>我该怎么办</strong> 进入最终选择。</p>`),

  '43': shell('43', '45', '我该怎么办', `
    <h1>我该怎么办？</h1>
    <div class="choice-box">
      <p>请输入你的指令：</p>
      <ul>
        <li><strong>公开</strong> — 曝光全部档案与录音</li>
        <li><strong>烧掉</strong> — 按顾临川条件换弟弟下落</li>
        <li><strong>守望者夜班</strong> — 接替夜班（？）</li>
      </ul>
      <form id="choice-form">
        <input id="choice-input" type="text" placeholder="输入指令…" autocomplete="off">
        <button type="submit">确认</button>
      </form>
    </div>`),

  '44': shell('44', '45', '结局：公开', `
    <h1>结局：公开</h1>
    <div class="ending">
      <p>你将 2019～2026 全部档案导出至公开镜像。江岳晚报刊发调查。</p>
      <p>沈屿在仓库被找到，消瘦，反复说 M-027。他活着。</p>
      <p>许文兰档案改回「离世」。这一次，是人工确认。</p>
    </div>
    <p style="margin-top:20px;"><a href="../index.html">返回开始</a></p>`, ' data-page="44"'),

  '45': shell('45', '45', '结局：烧掉', `
    <h1>结局：烧掉</h1>
    <div class="ending">
      <p>你烧掉手写页。顾临川兑现坐标。沈屿活着，但不敢再进 7 号楼。</p>
      <p>你关停不了守望者。你只是成了沉默共犯。</p>
      <p>三周后周德明去世。样本链断了。你想：这也许算干净。</p>
    </div>
    <p style="margin-top:20px;"><a href="../index.html">返回开始</a></p>`),

  'ex03': shell('ex03', '45', '杜姐口述', `
    <h1>彩蛋：小卖部杜姐</h1>
    <p>「三月十五凌晨，我看见货车从北门进。下来的人穿护工服，但走路姿势不对，像拖着的。」</p>`),

  'ex04': shell('ex04', '45', '马慧珍', `
    <h1>彩蛋：马慧珍</h1>
    <p>2024 离世。M-019 编号于 2025 年出现在另一住户录音标签上。</p>
    <p class="horror">编号从不作废。</p>`),

  'ex05': shell('ex05', '45', '结局：守望者', `
    <h1>结局：守望者夜班</h1>
    <div class="ending horror">
      <p>你穿上刘海生的制服完成巡楼。系统显示：沈攸，夜班照护员。</p>
      <p>程帆发来邮件：「合作愉快。」</p>
      <p>下一条待办：将外部威胁「沈攸」标记为——醒酒。</p>
      <p>页脚变为：∞/45 · 维护模式</p>
    </div>
    <p style="margin-top:20px;"><a href="../index.html">返回开始</a></p>`, ' data-page="ex05"'),

  'ex01': shell('ex01', '45', '源码彩蛋', `
    <h1>EX：源码注释</h1>
    <p>你在 hub 页源码里看见了注释：LANTING — 别信表格。别信守望者。</p>
    <p>顾临川虚构号码：170****0091</p>`),

  'ex02': shell('ex02', '45', '贴吧', `
    <h1>EX：家属帖</h1>
    <p>2020年澜庭贴吧：「我妈明明走了为什么还收到生日短信？」</p>
    <p>回复：「系统没关。」</p>
    <p><a href="../external/tieba-mirror.html">查看完整讨论串</a></p>`)
};

pages['01'] = shell('01', '45', '系统公告', `
  <h1>系统公告</h1>
  <p>澜庭老年公寓 · 照护档案系统 V2.3.1</p>
  <div class="note">因消防整改，自 2019-08-01 起暂停对外接待。本系统仅供内部使用。</div>
  <p>建议搜索：<strong>沈屿</strong>、<strong>管理员账号</strong></p>
  <p><a href="02.html">检索帮助</a></p>`);

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
for (const [name, html] of Object.entries(pages)) {
  fs.writeFileSync(path.join(outDir, `${name}.html`), html, 'utf8');
}
console.log('Generated', Object.keys(pages).length, 'pages');
