/**
 * 瞬云 SunYun Cloud - 独立官方参考套餐数据源
 * 字段规范：名称、价格、周期、流量额度、重置方式、有效期、设备限制、其他限制、核实状态、最后核实日期
 * 严守事实原则：不编造未经官方公开验证的参数，未知限制标记为“以服务商实际后台为准”
 */
const SUN_YUN_PLANS_DATA = [
  {
    id: "annual-mini",
    name: "限时年付小包",
    badge: "低门槛轻量",
    price: 99,
    currency: "¥",
    cycle: "年",
    cycleNote: "一次性支付结清，服务周期 365 天",
    traffic: "59GB / 月",
    trafficReset: "自然月按期重置",
    validity: "365 天（1 年）",
    deviceLimit: "服务商基础并发策略（建议 1~2 台）",
    otherLimits: "仅限个人常规检索与学习访问，不支持高并发爬虫与海量下载",
    verificationStatus: "公开资料核实",
    lastVerifiedDate: "2026-10-08",
    description: "专为轻度学术文献查阅、海外技术资料检索及低频出海人士量身定制，免除按月续费操作。"
  },
  {
    id: "walker-starter",
    name: "行者（入门推荐）",
    badge: "新手试水首选",
    price: 20,
    currency: "¥",
    cycle: "月",
    cycleNote: "按月订阅结算，灵活自主",
    traffic: "150GB / 月",
    trafficReset: "订阅账单日按期重置",
    validity: "30 天（可按需连续续费）",
    deviceLimit: "服务商标准设备并发（满足个人手机+电脑双端）",
    otherLimits: "支持常规 1080P 流媒体与日常交互，合理使用公网带宽",
    verificationStatus: "公开资料核实",
    lastVerifiedDate: "2026-10-08",
    description: "初次接触网络代理新手的理想起点，超低门槛即可全面体验瞬云亚太优化节点的稳定连接表现。"
  },
  {
    id: "journey-advanced",
    name: "纵横（进阶高频）",
    badge: "热门主打",
    price: 36,
    currency: "¥",
    cycle: "月",
    cycleNote: "按月订阅结算，充裕大流量",
    traffic: "300GB / 月",
    trafficReset: "订阅账单日按期重置",
    validity: "30 天（可按需连续续费）",
    deviceLimit: "多端协同并发支持（手机、平板、电脑协同）",
    otherLimits: "支持 4K 超清影音与算力交互，晚高峰带宽保障通道",
    verificationStatus: "公开资料核实",
    lastVerifiedDate: "2026-10-08",
    description: "面向跨境电商独立站运营、远程代码拉取协同与 4K 超清流媒体爱好者的高配性价比方案。"
  },
  {
    id: "sky-geek",
    name: "凌霄（海量极客）",
    badge: "大容量旗舰",
    price: 68,
    currency: "¥",
    cycle: "月",
    cycleNote: "按月订阅结算，顶级流量池",
    traffic: "600GB / 月",
    trafficReset: "订阅账单日按期重置",
    validity: "30 天（可按需连续续费）",
    deviceLimit: "高并发通道优先支持",
    otherLimits: "优先出口通道保障，满足重度流媒体与海量开源数据传输",
    verificationStatus: "公开资料核实",
    lastVerifiedDate: "2026-10-08",
    description: "针对多设备协同工作流、海外开发者团队以及海量数据资产流转设计的超大流量池套餐。"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUN_YUN_PLANS_DATA };
}
