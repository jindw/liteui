var alphaBeta = [
"Αα 阿尔法 Alpha",
"Ββ 贝塔 Beta",
"Γγ 伽玛 Gamma",
"Δδ 德尔塔 Delta",
"Εε 艾普西龙 Epsilon",
"Ζζ 捷塔 Zeta",
"Ζη 依塔 Eta",
"Θθ 西塔 Theta",
"Ιι 艾欧塔 Iota",
"Κκ 喀帕 Kappa",
"Λλ 拉姆达 Lambda",
"Μμ 缪 Mu",
"Νν 拗 Nu",
"Ξξ 克西 Xi",
"Οο 欧麦克轮 Omicron",
"Ππ 派 Pi",//∏π
"Ρρ 柔 Rho",
"Σσ 西格玛 Sigma",//∑σ
"Ττ 套 Tau",
"Υυ 宇普西龙 Upsilon",
"Φφ fai Phi",
"Χχ 器 Chi",
"Ψψ 普赛 Psi",
"Ωω 欧米伽 Omega",
]
var content = [
"Αα:",
"A代表:",
"α代表:",
"	几何:",
"		三角形里第一个角，在 边A的对面",
"		一元二次方程里的其中一个根（β代表另一个）",
"	统计:",
"		统计学上的假阳性率",
"		一个结果的显著性差异	",
"	物理:",
"		角加速度",
"		双极性晶体管中集极电流与射极电流的比例",
"		物理学上的精细结构常数",
"		一粒α粒子（He2+）",
"	热力学:",
"		热胀冷缩的系数",
"		热扩散率",
"	天文:",
"		天文测量学的赤经",
"		一个星座内最亮的一个星，如：半人马座α（次亮为β，以此类推）。",
"	化学:",
"		α碳原子为与有机物中与官能团相连的第一个碳原子（第二个为β碳原子，以此类推），如氨基酸中与羰基中的碳相连的碳原子即为α碳原子。",
"		解离度，指电解质达到解离平衡时，已解离的分子数和原有分子数之比。用希腊字母α来表示。",
"	金融:",
"		牺牲率的倒数",
"	其他:",
"		飞机的攻角",
"Ββ:",
"Β代表:",
"	概率:",
"		贝塔函数",
"β代表:",
"	几何:",
"		三角形里的第二个角，在 边B的对面",
"	代数:",
"		一元二次方程里的其中一个根（α代表另一个）",
"	概率:",
"		统计学上的假阴性率",
"	物理:",
"		双极性晶体管中集极电流与基极电流的比例",
"		β粒子（e-）",
"		声强",
"		速度除以狭义相对论上的光速",
"	金融:",
"		金融数学上的Beta系数（资产的不可分发率）",
"	天文:",
"		天文测量学上的黄道座标系统",
"	其他:",
"		飞机的侧滑角",
"		脑或认知科学里的 beta脑电波（β-脑波）",
"Γγ:",
"Γ代表:",
"	数学:",
"		伽玛函数（产生阶乘的函数）",
"		模群",
"		伽玛分布（以Γ函数定义的连续机率分布）",
"		第二种的克氏符号",
"		图中与一顶点中有边相连的顶点",
"	物理:",
"		传输或电讯线路的反射系数",
"		波导的光学模式的限制因子",
"γ代表:",
"	数学:",
"		下不完全Γ函数",
"		三角形里第三个角，在 边C的对面",
"		数学上的欧拉-马歇罗尼常数",
"	物理:",
"		伽马射线和光子",
"		热力学上的绝热指数",
"		狭义相对论上的劳仑兹因子",
"		阻尼系数（kg/s）",
"	物理:",
"		结构工程中负荷与材质的安全系数",
"		物质的比重量",
"Δδ:",
"Δ代表:",
"	数学:",
"		有限差分",
"		差分算子",
"		对称差",
"		拉普拉斯算子",
"		一元二次方程的判别式；;b²-4ac",
"	几何:",
"		一条圆形曲线的圆心角",
"		反矩阵的行列式",
"		图中各顶点度数的最小值",
"		给定变量的变化，如 ∆v 代表速度的变化",
"	金融:",
"		金融数学上的价格敏感度",
"	天文:",
"		以天文单位作单位，与地球的距离",
"	化学:",
"		化学式的热量",
"δ代表:",
"	数学:",
"		变分法的一个变分",
"		克罗内克函数",
"		斯科罗霍德积分",
"		图中最小的角度",
"	金融:",
"		金融数学上的复利",
"		狄拉克δ函数",
"	天文:",
"		天文测量学上的赤纬",
"		特纳函数（Turner Function）",
"		光程差",
"Εε:",
"ε代表:",
"	数学:",
"		在统计学和机率论中的期望值",
"		在极限中代表一个很小的正数",
"		回归分析中一个随机的错误",
"		集合论中最大的序数：ε，ε^ε，ε^ε^ε，……",
"		列维-奇维塔符号",
"		在集合中，属于一集合的元素的符号∈是由 ε 演变而来的。",
"	计算机:",
"		在计算机科学中的空串",
"	物理:",
"		电动势",
"		在电磁学中的介电质电容率",
"		发射率",
"		在连续介质力学中的形变",
"		电容率",
"		力学中的应变",
"	天文:",
"		在天文测量学中，地球的转轴倾角",
"	金融:",
"		在经济学中的弹性",
"	化学:",
"		在化学中，发色团的莫耳吸光度",
"Ϝϝ:",
"Ϝ代表:",
"	数学:",
"		有时用作表示双伽玛函数，但通常被拉丁字母 F（差不多一样）替代。",
"Ζζ:",
"ζ代表:",
"	数学:",
"		在数学中的黎曼ζ函数和其他的ζ函数",
"	物理:",
"		聚合物力学的黏性系数",
"		阻尼比",
"		流体力学中的涡量",
"η代表:",
"	概率统计:",
"		在统计学中的部分回归系数",
"		统计学中的效率",
"	金融:",
"		在经济学中的弹性",
"	物理:",
"		指自由空间的本质阻抗",
"		折射率",
"		介子的一种",
"		黏度",
"		物理学中的效率",
"		在相对论中的闵考斯基时空",
"		通信系统里的杂音",
"	气象:",
"		气象学中的绝对涡量，指将相对涡量与地球转动造成的科氏力一并考虑的涡量。",
"Θθ:",
"Θ代表:",
"	数学:",
"		指非零的序数",
"	金融:",
"		金融数学中已过的时间的敏感度",
"θ代表:",
"	数学:",
"		Θ函数",
"		切比雪夫函数",
"	几何:",
"		在几何学中的角",
"		在球坐标系或圆柱坐标系中，x轴与xy平面的角",
"	热力学:",
"		在热力学中的位温",
"	其他:",
"		工程学以θ代表平均故障间隔",
"		土壤含水量",
"		德拜温度",
"Ιι:",
"ι代表:",
"	计算机:",
"		APL语言中的指标生成函数",
"Κκ:",
"κ代表:",
"	数学:",
"		矩阵条件数，指数量在数值计算中的容易程度的衡量。",
"	几何:",
"		曲率",
"		连通图",
"		Kappa曲线",
"	物理:",
"		介电常数( ε / ε0)",
"		热导率（亦常使用小写拉丁字母 k）",
"		弹簧的劲度系数（亦常使用小写拉丁字母 k）",
"		绝热指数（亦常用 γ）",
"		壁面紊流",
"Λλ:",
"Λ代表:",
"	数学:",
"		线性代数中特征矢量的对角矩阵",
"		冯·曼戈尔特函数",
"		公理系统内一个逻辑公理",
"	天文:",
"		宇宙学常数",
"	物理:",
"		Λ粒子，一种重子",
"		电磁学中的磁导",
"λ代表:",
"	数学:",
"		指数衰减",
"		刘维尔函数",
"		卡迈克尔函数",
"	概率统计:",
"		卜瓦松分布的一个参数",
"		矩阵的特征值",
"		等候理论的到达率",
"		指数分布的一个参数",
"		失效率",
"		平均数",
"		勒贝格可测集的勒贝格测度，等于这个集合通常意义的体积。",
"	计算机:",
"		λ演算",
"		计算机科学中的空字符串",
"	物理:",
"		波长，一固定的频率里，离平衡位置的位移与时间皆相同的两个质点之间的最短距离。",
"		聚变的潜热",
"	金融:",
"		拉格朗日乘数，也应用于经济学的影子价格",
"		经度",
"	天文:",
"		黄经，为黄道座标系统中用来确定天体在天球上位置的一个座标值。",
"	其他:",
"		线密度",
"		等于一微升（1 µL）或 一立方毫米（1 mm³）【1 微升 = 1 立方毫米】",
"Μμ:",
"μ代表:",
"	数学:",
"		数论中的莫比乌斯函数",
"		表示模的环表示",
"	概率统计:",
"		概率论和统计学中总体的平均数或期望值",
"		测度论中的一个测度",
"		等候理论中的服务效率",
"	物理:",
"		物理学中的动摩擦因数",
"		物理学中的黏度",
"		电磁学中的磁导率",
"		μ子",
"		约化质量",
"		凝聚态物理学中的化学势",
"	其他:",
"		微, 一个国际单位制词头，表示 10-6（百万分之一）",
"		药理学中，使得与其结合的脑内啡有最高的亲和势的受体。",
"Νν:",
"ν代表:",
"	数学:",
"		数学中的零空间",
"	物理:",
"		物理学中的频率（以赫兹(Hz) 为单位）",
"		材料科学中的泊松比",
"		中微子",
"		液体的kinematic viscosity（动黏滞率，动黏度；运动粘度；运动粘性）",
"	化学:",
"		化学计量系数",
"Ξξ:",
"Ξ代表:",
"	物理:",
"		统计力学中的巨正则系综",
"		一类重子",
"ξ代表:",
"	概率统计:",
"		概率论中的一个随机变量",
"	物理:",
"		相干长度",
"		阻尼比",
"	化学:",
"		化学反应的程度",
"Οο:",
"Ο代表:",
"Ππ:",
"Π代表:",
"	数学:",
"		数学中用以表示乘积的符号",
"	几何:",
"		几何学中一个平面",
"π代表:",
"	几何:",
"		圆周率，为圆的周长与直径的比值",
"	数学:",
"		数论中的素数计数函数",
"	概率统计:",
"		马尔科夫链的状态分布",
"	金融:",
"		微观经济学和博弈论中的利润",
"		宏观经济学中的通货膨胀率，表示为与时间有关的常数",
"	化学:",
"		化学中的一种共价键(π键)",
"	物理:",
"		粒子物理学中的π介子",
"		电子学中，一种小信号模型又被称为混合π模型",
"ϖ代表:π一种变体) ：",
"	天文:",
"		流体力学中的波浪的角频率（角频率常用ω表示，但易与涡度的符号混淆）",
"		天体力学中的近心点经度",
"		宇宙学中的同移距离",
"Ρρ:",
"ρ代表:",
"	数学:",
"		矩阵的秩",
"	几何:",
"		极坐标系，柱坐标系和球坐标系中的半径",
"	概率统计:",
"		统计学中的相关系数",
"	金融:",
"		金融数学中的利率敏感度",
"	计算机:",
"		APL语言中的变形运算符",
"	物理:",
"		密度",
"		电阻率",
"Σσ:",
"Σ代表:",
"	数学:",
"		求和算子",
"		协方差矩阵",
"	计算机:",
"		形式语言中的终结符号的集合",
"σ代表:",
"	数学:",
"		数论中的一类除数函数",
"		解析数论中复变量的实部",
"		群论中的一个置换",
"		关系代数中的选择算子",
"	概率统计:",
"		概率论，统计中一个分布的标准差",
"		不确定性",
"	化学:",
"		化学中的一种共价键 (σ键)",
"	物理:",
"		力学中的应力",
"		电导率（电阻率的倒数）",
"		面积密度",
"		黑体辐射的斯特藩-玻尔兹曼常数",
"Ττ:",
"τ代表:",
"	概率统计:",
"		一个时间区间",
"		指数衰减的量的平均寿命",
"	几何:",
"		黄金分区率0.618…… (尽管 φ 更常用)",
"		拓扑学中一个指定的拓扑",
"		圆周率的2倍（2π），即圆的周长与半径之比。",
"	数学:",
"		数论中的拉马努金τ函数",
"		表示论中的缠结算子",
"		高欧拉商数的除数个数（OEIS中的数列A000005）",
"		类型论中的类型变量，如简单类型λ演算",
"	天文:",
"		天文学中，透明度的衡量，或者说，有多少阳光不能穿透大气。",
"	物理:",
"		力学中的力矩",
"		τ子，粒子物理学中的一种基本粒子",
"		自发发射过程的寿命",
"		RC电路的时间常数",
"		相对论中的原时",
"		连续介质力学中的剪应力",
"	化学:",
"		Tau 蛋白，一种与微管结合的蛋白",
"Υυ:",
"Υ代表:",
"	物理:",
"		Υ介子，一种粒子",
"Φφ:",
"Φ代表:",
"	概率统计:",
"		正态分布的累积分布函数",
"	几何:",
"		黄金分区率的倒数，即 1/φ",
"	物理:",
"		逸出功，是指使一个电子立即从固体表面逸出，所需提供的最小能量。",
"		磁通量",
"	化学:",
"		苯基",
"φ代表:",
"	概率统计:",
"		正态分布的密度函数",
"	几何:",
"		平面角的大小值",
"		球坐标下与 z 轴的夹角",
"		黄金分区率，约等于 0.618……",
"		大地测量学中的纬度",
"	数学:",
"		数论中的欧拉函数",
"		解析空间中的全纯函数",
"		复数的辐角",
"		表示体积分数，符号为φ，是指分散质的体积/分散剂的体积。例如白酒标注的度数所谓的'°'其实就是指的白酒中酒精的体积分数。",
"	物理:",
"		辐射通量",
"		电势",
"		物理学和数学中的标量场",
"Χχ:",
"χ代表:",
"	概率统计:",
"		统计学中的χ分布（卡方分布（χ2分布）相对更为常见）",
"		数学中的特征，特别是指狄利克雷特征",
"	数学:",
"		图论中一个图的着色数",
"		代数拓扑中的欧拉示性数",
"		数学中的指示函数",
"	化学:",
"		元素周期表中表示电负性",
"	物理:",
"		拉比频率",
"		基本粒子的旋量",
"		水势能",
"Ψψ:",
"Ψ代表:",
"	数学:",
"		组合子逻辑中的 quaternary 组合子",
"	概率统计:",
"		统计学中的残差矩阵",
"ψ代表:",
"	数学:",
"		数论中的第二切比雪夫函数",
"	几何:",
"		在内蕴坐标系下，曲线的切线与x轴的夹角",
"	物理:",
"		量子力学中薛定谔方程的波函数",
"		流体动力学中的流体函数",
"	其他:",
"		车辆的偏航角",
"Ωω:",
"Ω代表:",
"	数学:",
"		数学中的欧米加常数",
"		与大O记号相关的一个渐进下界记号",
"		算术函数Ω(n), 等于n的素因子分解中所有素因子的方次的和",
"	概率统计:",
"		样本空间，概率论和统计力学中所有可能的事件或系统状态的集合",
"	几何:",
"		立体角",
"	物理:",
"		物体的转速",
"		Ω重子",
"	天文:",
"		天体力学中的升交点黄经",
"		物理宇宙学中的密度参数",
"	其他:",
"		欧姆，国际单位制中电阻的单位",
"ω代表:",
"	数学:",
"		第一个无穷序数",
"		自然数集，常用于集合论中，其他数学领域中则常用来表示自然数集",
"		与大O记号相关的一个渐进下界记号",
"		三次单位根的一个，另一个是它的平方：ω²",
"		算术函数ω(n) ，等于n 的不相同的素因子的个数",
"		微分形式",
"	概率统计:",
"		概率论中，一个实验的可能结果",
"	物理:",
"		角速度",
"		角频率",
"		使用位势高度的坐标系下的垂直速度，常用于大气动力学中",
"		ω介子",
"	天文:",
"		天体力学中的近心点幅角",
]
var values = [];
var keys = alphaBeta.map(function(a){
	var m = a.split(' ');
	var k = m[0];
	var n = m[2].toLowerCase();
	var v = {
		title:"🔊 "+m[1] +' '+m[2],
		name:n,
		play:function(){
			play(n)
		}
		//value:m[2]
	}
	Object.defineProperty(v,'value',{
		get:function(){
			return findContent(k);
		}
	})
	values.push(v)
	return k;
});
function play(n){
	var audio = document.createElement('audio');
    audio.src = 'http://www.xidea.club/greek/sound/'+n+'.wav';
    audio.loop = false; 
	audio.play()
}
//play();
//console.log('beta:',values[1].value)
function findContent(k){
	var i = content.indexOf(k+':');
	for(var j=i+1;j<content.length;j++){
		var item = content[j];
		if(item.length == 3){
			if(item.charAt(j)!='\t'){
				break;
			}
		}
	}
	var rtv = content.slice(i+1,j).join('\n');
	//console.log('content item:',i,j,k,rtv)
	return rtv.replace(/(^\t+)/gm,'$1$1$1$1$1$1$1$1');
}
exports.data = [keys,values,1];
var source = require('./greek-xul.xml')
exports.load = function(){
	require('liteui/liteui').load(source || './assets/greek-xul.xml',[keys,values,1])
}