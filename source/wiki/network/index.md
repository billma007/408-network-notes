---
title: "计算机网络强化讲义 · 目录"
collection:
  profile: wiki
  id: network
comments:
  enabled: false
footer:
  license: false
  share: []
---
**使用入口：[知识点蒸馏（考前速记）](/408-network-notes/wiki/network/distilled/)** · [结课自测与重点清单](/408-network-notes/wiki/network/quiz/) · [视频覆盖与缺失记录](/408-network-notes/wiki/network/coverage/)

本讲义依据本地《27考研王道计算机·计算机网络强化班》7份视频（共约24小时07分钟）整理。保留可核验的关键概念、公式及使用条件、解题过程、重点提示和有助理解的类比；按教材小节组织跨课例题，不按视频先后重复记录。同一综合题不同问涉及的知识分放在各节。

时间紧就先看蒸馏手册，再闭卷做自测。不熟的知识返回相应小节；优先顺序建议为 4.2 → 5.3 → 3.4/3.5 → 3.6/3.8 → 6.2/6.5 → 4.4，然后补物理层和其他协议。以下是本套强化课实际涉及的24节；仅简略提及的知识在对应小节标注，未独立讲授的教材章节不冒充已有课程内容。

## 第1章 计算机网络体系结构

- [1.1 计算机网络概述与性能指标](/408-network-notes/wiki/network/1-1/)
- [1.2 体系结构与逐层协议封装](/408-network-notes/wiki/network/1-2/)

## 第2章 物理层

- [2.1 通信基础与数据传输速率](/408-network-notes/wiki/network/2-1/)
- [2.2 传输介质](/408-network-notes/wiki/network/2-2/)
- [2.3 物理层设备](/408-network-notes/wiki/network/2-3/)

## 第3章 数据链路层

- [3.1 数据链路层的功能](/408-network-notes/wiki/network/3-1/)
- [3.2 组帧与帧边界](/408-network-notes/wiki/network/3-2/)
- [3.3 差错控制](/408-network-notes/wiki/network/3-3/)
- [3.4 流量控制与可靠传输](/408-network-notes/wiki/network/3-4/) ★
- [3.5 介质访问控制](/408-network-notes/wiki/network/3-5/) ★
- [3.6 局域网与以太网](/408-network-notes/wiki/network/3-6/) ★
- [3.8 数据链路层设备与交换机自学习](/408-network-notes/wiki/network/3-8/) ★

3.7 广域网：仅提及PPP/PPPoE及封装层次，归至1.2；没有确认独立讲解。

## 第4章 网络层

- [4.1 网络层的功能及转发](/408-network-notes/wiki/network/4-1/)
- [4.2 IPv4及配套协议（子网、DHCP、ARP、NAT、分片）](/408-network-notes/wiki/network/4-2/) ★
- [4.4 路由算法与路由协议（RIP、OSPF、BGP）](/408-network-notes/wiki/network/4-4/) ★
- [4.7 网络层设备](/408-network-notes/wiki/network/4-7/)

4.3 IPv6、4.5 IP组播、4.6 移动IP：未确认有独立强化专题；本次不补写成假定的原课内容。

## 第5章 传输层

- [5.1 传输层提供的服务](/408-network-notes/wiki/network/5-1/)
- [5.2 UDP用户数据报](/408-network-notes/wiki/network/5-2/)
- [5.3 TCP协议（报文段、连接、确认号、窗口）](/408-network-notes/wiki/network/5-3/) ★

## 第6章 应用层

- [6.1 网络应用模型与常用协议](/408-network-notes/wiki/network/6-1/)
- [6.2 域名系统DNS](/408-network-notes/wiki/network/6-2/) ★
- [6.3 文件传输协议FTP](/408-network-notes/wiki/network/6-3/)
- [6.4 电子邮件协议](/408-network-notes/wiki/network/6-4/)
- [6.5 万维网与HTTP](/408-network-notes/wiki/network/6-5/) ★

## 阅读说明

文中 `[用户材料]` 标识出处。★是根据课程反复训练/老师强调的学习优先级，不等于官方命题统计。必要的拓扑、帧图截取为6张配图，其余用表格和时序图表述；没有重复大段纯文字课件。

002 网络层直播后半部分源视频画面解码异常，存在不可核验的原始画面，已使用可辨音频、其他直播的重复内容以及结课题解析交叉复核；因此不能保证该缺失区间中仅出现在画面上的信息全部恢复。详见[覆盖记录](/408-network-notes/wiki/network/coverage/)。
