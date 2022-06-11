export const miniAppIds = {
  vv会员: '2021002152610059',
  存量小程序: '2021002181632074',
  宽带中心小程序: '2021003120640616',
}
export const miniAppPages = {
  vv会员: {
    '首页/办理页': 'pages/index/index',
    '详情页/生效页': 'pages/detail/index',
    会员管理: 'pages/manage/index',
    会员规则: 'pages/memberRule/index',
    会员退订: 'pages/exit/index',
    退订调查问卷: 'pages/question/index',
    会员攻略: 'pages/strategy/index',
    权益中间页: 'pages/yinge/index',
    会员账单: 'pages/billList/index',
    会员周: 'pages/memberWeek/index',
    会员任务: 'pages/task/index',
    淘宝: 'pages/taobao/index',
  },
  存量小程序: {
    首页: 'pages/index/index',
    支付结果页: 'pages/payResult/index',
    订单列表: 'pages/tradeList/index',
    订单详情: 'pages/tradeDetail/index',
    协议页面: 'pages/pureText/index',
  },
  宽带中心小程序: {
    首页: 'pages/index/index',
    oao列表页: 'pages/oao/index',
  },
}
export const miniAppPageExtra = {
  2021002181632074: {
    'pages/index/index': {
      pathname: ['splitItem', 'swiperItem', 'singleItem'],
    },
  },
  2021002152610059: {
    'pages/index/index': {
      upgrade: true,
      type: 'basic',
      frame: 'single',
      anchor: ['call', 'life', 'fee'],
    },
    'pages/exit/index': {
      type: ['vip', 'basic'],
    },
    'pages/manage/index': {
      type: ['vip', 'basic'],
    },
    'pages/memberRule/index': {
      type: ['vip', 'basic'],
    },
    'pages/question/index': {
      type: ['vip', 'basic'],
    },
    'pages/strategy/index': {
      type: ['vip', 'basic'],
    },
  },
  2021003120640616: {},
}
export const cascaderData = Object.entries(miniAppPages).map((e) => {
  const app = {
    value: e[0],
    label: e[0],
    children: Object.keys(e[1]).map((e) => {
      const page = {
        value: e,
        label: e,
      }
      return page
    }),
  }
  return app
})
