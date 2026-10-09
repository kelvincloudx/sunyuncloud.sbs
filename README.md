# 瞬云 (SunYun Cloud) 官方落地页与知识库

瞬云 (SunYun Cloud) 官方服务指南、套餐全规格说明与跨平台开源客户端配置手册。

- 🌐 官方域名：`https://sunyuncloud.sbs`
- ⚡ 专属注册与订购入口：`https://varnexa.lingdongaff.com/#/?code=HHoxxHGa`
- 🎨 设计定位：**日系极简 × 暖色编辑式品牌官网**（高留白、杂志排版、大文字、重正文）

---

## 🎨 全新视觉与规范配色

全站采用温润柔和的日系编辑式设计语言，以纯 CSS 渲染轻微云影与柔光效果，避免沉重背景与大图阻塞加载：

- **主背景（暖奶油白）**：`#FFF8F0`
- **次级背景（浅米杏色）**：`#F4E9DC`
- **标题文字（深咖啡色）**：`#49382F`
- **正文文字（暖灰棕）**：`#66574D`
- **主强调色（陶土橘）**：`#C76B50`
- **辅助色（鼠尾草绿）**：`#7D9A8B`
- **分割线 / 边框**：`#E6D7C8`

---

## 🏛 页面架构体系

### 首页结构（8 大核心板块）
1. **01 品牌介绍**：H1「瞬云 SunYun Cloud｜套餐说明与新手使用指南」，独立编写品牌与架构说明。
2. **02 订阅前须知**：计费周期、清零重置规则、流量真实估算、密钥保密与月付试水建议。
3. **03 套餐价格**：纵向极简套餐列表（限时年付小包、行者套餐、纵横套餐、凌霄套餐），标注核实状态。
4. **04 新手使用步骤**：纵向时间轴（Timeline）展示了解、订阅、下载客户端、导入分流与日常验证 5 大阶段。
5. **05 设备使用指南**：按 Windows、Android、iOS、macOS 分类，提供推荐客户端与核心避坑指南。
6. **06 瞬云专题文章**：杂志式双列分栏导读，导流至 10 篇深度专属技术文章。
7. **07 常见问题**：独立展开的文字问答，解答时钟同步、分流规则、多端并发等高频问题。
8. **08 页脚**：品牌声明、导航入口、推广合作披露，以及高质量 dofollow 友情链接。

---

## 📚 10 篇瞬云专属深度文章（各 1,500 ~ 2,000 汉字）

全站 10 篇文章均为独立正文编写，严格对应标题与规范字数，具备独立 Canonical、SEO Meta 与 Schema：

| 序号 | 专属文章标题 | 文件路径 | 正文字数 |
| :---: | :--- | :--- | :---: |
| 1 | 《瞬云新手使用指南：从了解套餐到完成首次连接》 | `articles/getting-started-guide.html` | 1,846 汉字 |
| 2 | 《瞬云套餐如何选择？流量额度、周期与使用需求详解》 | `articles/plan-selection-guide.html` | 1,804 汉字 |
| 3 | 《瞬云Windows使用教程：客户端配置与常见设置》 | `articles/windows-client-tutorial.html` | 1,613 汉字 |
| 4 | 《瞬云Android使用教程：订阅添加与网络权限检查》 | `articles/android-client-tutorial.html` | 1,610 汉字 |
| 5 | 《瞬云iPhone使用注意事项：兼容性与配置准备》 | `articles/iphone-client-precautions.html` | 1,582 汉字 |
| 6 | 《瞬云订阅链接如何管理？更新、备份与安全注意事项》 | `articles/subscription-link-management.html` | 1,745 汉字 |
| 7 | 《瞬云连接失败怎么办？常见问题逐步排查》 | `articles/troubleshooting-connection-failures.html` | 1,666 汉字 |
| 8 | 《瞬云流量消耗过快的原因与使用习惯检查》 | `articles/traffic-consumption-diagnosis.html` | 1,632 汉字 |
| 9 | 《瞬云多设备使用指南：电脑与手机配置注意事项》 | `articles/multi-device-configuration-guide.html` | 1,526 汉字 |
| 10 | 《瞬云使用常见问题：套餐到期、订阅更新与账户安全》 | `articles/frequently-asked-questions.html` | 1,609 汉字 |

---

## 🔧 SEO、安全与合规特性

- **Canonical 规范**：全站所有页面严格指向 `https://sunyuncloud.sbs` 正式地址。
- **GEO 定位**：亚太香港出海网络核心节点定位。
- **JSON-LD 结构化数据**：包含 `WebSite`、`Organization`、`FAQPage`、`Article` 与 `BreadcrumbList`，彻底杜绝虚假评分。
- **外链属性**：所有推广链接均配置 `rel="sponsored nofollow noopener"`；页脚 PBN 友情链接（机场测评 / 机场教程）保持纯净 `target="_blank"` 与 **dofollow** 状态。
- **301 永久重定向**：内置历史旧文章 URL 映射表与静态重定向降级方案，保证 0 死链。

---

## 🚀 本地运行与验证

### 启动本地 Web 服务器
```bash
node server.js
```
访问：`http://127.0.0.1:8080/`

### 运行 72 项自动化质量验证
```bash
node verify.js
```
