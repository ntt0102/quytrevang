import{_ as S}from"./chart-28b53639.js";import C from"./OpeningSummary-eb160d88.js";import A from"./Summary-b5daee7f.js";import z from"./TrackStatisticPopup-94ab2509.js";import{u as F,b as B,c as L,i as b,d as V,r as D,e as y,y as R,f as q,g as c,j as d,h as o,k as M,l as E,F as N,o as u}from"./app-72b2fe4c.js";import"./m_base_chart-45bf948b.js";const G={class:"trades-page content-block dx-card responsive-paddings"},j={key:0},O=["fill"],W={key:1},U=o("rect",{x:0,y:0,width:20,height:2,fill:"DarkOrange"},null,-1),Z=o("rect",{x:0,y:2,width:20,height:4,fill:"FireBrick"},null,-1),H=o("rect",{x:0,y:5,width:20,height:4,fill:"DarkGreen"},null,-1),J=[U,Z,H],K={key:2},Q=["fill"],ie={__name:"Index",setup(X){const v=F(),$=B(),{t:a}=L(),g=b("bus"),s=b("filters");let m={principalTargetThreshold:{day:1,week:5,month:22,quarter:65,year:260},feesTargetThreshold:5};const r=V({money:!0,rr:!1,winrate:!1,accProfit:!0}),p=D(null),n=y(()=>v.state.tradingStatistic.charts);y(()=>v.state.auth.user.permissions),v.dispatch("tradingStatistic/getProfitChart",$.query.period??"day"),g.on("toggleMenu",()=>{setTimeout(()=>p.value.instance.render(),300)}),R(()=>g.off("toggleMenu"));function k({value:e,series:t}){return t.tag==="rr"&&e>=m.principalTargetThreshold[n.value.period]?{color:"Aqua",hoverStyle:{color:"Aqua"}}:t.tag==="winrate"&&e>=m.feesTargetThreshold?{color:"Fuchsia",hoverStyle:{color:"Fuchsia"}}:{color:t.color,hoverStyle:{color:t.color}}}function T({valueText:e}){return`${e.replace(",0","").replace("M"," Tr")}`}function w(e){let t=e.point.data.accProfit,l=f();if(l!==null){let i=n.value.data.find(P=>P.time===l).accProfit;t=t-i}return{html:`<div class='trade-chart-tooltip'>
                <div class='tooltip-header'>
                  ${e.argumentText}
                </div>
                <div class='tooltip-body'>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${a("trading.trades.principalAvg")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${s.currency(e.point.data.principal)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${a("trading.trades.revenueSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${s.currency(e.point.data.revenue)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${a("trading.trades.lossSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${s.currency(e.point.data.loss)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${a("trading.trades.feesSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${s.currency(e.point.data.fees)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${a("trading.trades.profitSum")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value' style='font-weight: bold; color:${e.point.data.profit>=0?"green":"red"}'>
                      ${s.currency(e.point.data.profit)}
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='top-series-name'>
                      ${a("trading.trades.rr")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='top-series-value'>
                      ${s.numberVnFormat(e.point.data.rr,1)}%
                      (${(100*e.point.data.rr/m.principalTargetThreshold[n.value.period]).toFixed(0)}%
                      ${a("trading.trades.kpi")})
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${a("trading.trades.winrate")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${s.numberVnFormat(e.point.data.winrate,1)}
                      (${(100*e.point.data.winrate/m.feesTargetThreshold).toFixed(0)}%
                      ${a("trading.trades.kpi")})
                    </span>
                  </div>
                  <div class='series-name'>
                    <span class='bottom-series-name'>
                      ${a("trading.trades.accProfit")}
                    </span>:
                  </div>
                  <div class='value-text'>
                    <span class='bottom-series-value'>
                      ${s.currency(t)}
                    </span>
                  </div>
                </div>
              </div>`}}function x({target:e}){let t=f()===e.argument?null:e.argument;h(t)}function _(e){const t=e.target;let l=f();t.isVisible()?(t.hide(),r[t.tag]=!1):(t.show(),r[t.tag]=!0),setTimeout(()=>h(l),0)}function f(){return p.value.instance.option("argumentAxis.constantLines[0].value")}function h(e){return p.value.instance.option("argumentAxis.constantLines[0].value",e)}return(e,t)=>{const l=q("DxToolbar");return u(),c(N,null,[d(C,{hasTitle:!1}),d(A,{hasTitle:!1}),o("div",G,[d(l,{items:[{visible:e.$mf.isSet(e.$route.query),location:"before",widget:"dxButton",options:{icon:"far fa-arrow-left small",hint:e.$t("buttons.back"),onClick:()=>e.$router.go(-1)}},{location:"before",cssClass:"page-button",widget:"dxButton",options:{icon:"far fa-backward small",hint:e.$t("trading.trades.buttons.more"),elementAttr:{"data-page":n.value.page},onClick:()=>e.$store.dispatch("tradingStatistic/lazyLoad")}},{location:"before",widget:"dxButton",options:{icon:"far fa-database small",hint:e.$t("trading.statistic.buttons.addData"),onClick:()=>e.$refs.trackStatisticPopupRef.show()}},{location:"after",widget:"dxSelectBox",options:{width:90,items:e.$mf.getChartPeriodList(),displayExpr:"name",valueExpr:"value",value:n.value.period,dropDownOptions:{wrapperAttr:{class:"statistic-period-select-popup"}},onValueChanged:i=>e.$store.dispatch("tradingStatistic/getProfitChart",i.value)}}]},null,8,["items"]),d(E(S),{ref_key:"chartRef",ref:p,"data-source":n.value.data,"customize-point":k,title:{text:e.$t("trading.statistic.charTitle"),horizontalAlignment:"center"},size:{width:"100%"},zoomAndPan:{argumentAxis:"both"},loadingIndicator:{enabled:!0,show:!0,text:e.$t("titles.loadingText")},export:{enabled:!0,formats:["PNG"],fileName:"chart",printingEnabled:!1},commonSeriesSettings:{argumentField:"date",barPadding:0},series:[{name:e.$t("trading.statistic.profitSum"),tag:"money",valueField:"profit",axis:"money",type:"stackedbar",stack:"money",color:"DarkGreen",visible:r.money},{name:e.$t("trading.statistic.rr"),tag:"rr",valueField:"rr",axis:"rr",type:"stackedbar",stack:"rr",color:"Teal",visible:r.rr},{name:e.$t("trading.statistic.winrate"),tag:"winrate",valueField:"winrate",axis:"winrate",type:"stackedbar",stack:"winrate",color:"Purple",visible:r.winrate},{name:e.$t("trading.statistic.accProfit"),tag:"accProfit",valueField:"accProfit",axis:"accProfit",type:"spline",color:"White",visible:r.accProfit}],valueAxis:[{name:"money",synchronizedValue:0,label:{customizeText:T},constantLines:[{value:0,color:"White",label:{visible:!1},displayBehindSeries:!0}]},{name:"rr",synchronizedValue:0,label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1},{name:"winrate",synchronizedValue:0,label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1},{name:"accProfit",label:{visible:!1},tick:{visible:!1},grid:{visible:!1},visible:!1}],tooltip:{enabled:!0,shared:!1,customizeTooltip:w},legend:{verticalAlignment:"top",horizontalAlignment:"center",hoverMode:"none",markerTemplate:"markerTemplate"},argumentAxis:{constantLines:[{width:2,color:"white",dashStyle:"dot",value:null}]},onPointClick:x,onLegendClick:_},{markerTemplate:M(({data:i})=>[(u(),c("svg",null,[i.series.tag==="accProfit"?(u(),c("g",j,[o("path",{d:"M 0 8 C 2 4 7 4 9.5 8 C 11 12 16 12 18 8 L 18 10 C 16 14 11 14 8.5 10 C 7 6 2 6 0 10 Z",fill:i.marker.fill},null,8,O)])):i.series.tag==="money"?(u(),c("g",W,J)):(u(),c("g",K,[o("rect",{x:0,y:0,width:20,height:10,fill:i.marker.fill},null,8,Q)]))]))]),_:1},8,["data-source","title","loadingIndicator","series","valueAxis","tooltip"]),d(z,{ref:"trackStatisticPopupRef"},null,512)])],64)}}};export{ie as default};
