const Mock=require('mockjs');
//通话录音
Mock.mock('/api/tonghua',{
    'data|1-1':[
        {'isdate':'2019-12-05 周四','beizhu':'向梓曈资质不符向梓曈资质不符向梓曈资质不符向梓曈资质不符','isphone':'17515151214','type':'呼出','through':'已接通','start_time':'10:25:15','length_time':'58秒','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'顾问'},
        {'isdate':'2019-12-05 周四','beizhu':'向梓曈资质不符','isphone':'17515151214','type':'呼出','through':'未接通','start_time':'10:25:15','length_time':'58秒','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'部门主管'},
        {'isdate':'2001','beizhu':'向梓曈资质不符','isphone':'17515151214','type':'呼入','through':'已接通','start_time':'10:25:15','length_time':'58秒','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'负责人'},
        {'isdate':'2001','beizhu':'向梓曈资质不符','isphone':'17515151214','type':'呼入','through':'未接通','start_time':'10:25:15','length_time':'58秒','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'顾问'},
        {'isdate':'2001','beizhu':'向梓曈资质不符','isphone':'17515151214','type':'呼出','through':'已接通','start_time':'10:25:15','length_time':'58秒','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'顾问'},
        {'isdate':'2001','beizhu':'向梓曈资质不符','isphone':'17515151214','type':'呼出','through':'未接通','start_time':'10:25:15','length_time':'58秒','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'顾问'},
        {'isdate':'2001','beizhu':'向梓曈资质不符','isphone':'17515151214','type':'呼入','through':'未接通','start_time':'10:25:15','length_time':'58秒','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'顾问'},
        {'isdate':'2001','beizhu':'向梓曈资质不符','isphone':'17515151214','type':'呼出','through':'已接通','start_time':'10:25:15','length_time':'58秒','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'顾问'},
        {'isdate':'2001','beizhu':'向梓曈资质不符','isphone':'17515151214','type':'呼出','through':'已接通','start_time':'10:25:15','length_time':'58秒','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'顾问'},
        {'isdate':'2001','beizhu':'向梓曈资质不符','isphone':'17515151214','type':'呼出','through':'已接通','start_time':'10:25:15','length_time':'58秒','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'顾问'},
        {'isdate':'2001','beizhu':'向梓曈资质不符','isphone':'17515151214','type':'呼出','through':'未接通','start_time':'10:25:15','length_time':'58秒','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'顾问'},
        {'isdate':'2001','beizhu':'向梓曈资质不符','isphone':'17515151214','type':'呼出','through':'已接通','start_time':'10:25:15','length_time':'58秒','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'顾问'},
    ]
});
//手机短信
Mock.mock('/api/duanxin',{
    'data|1-1':[
        {'isdate':'2019-12-05 周四','isphone':'106****204209757920','sendtimes':'10:25:15','smstype':'接收','sms_content':'尊敬的客户：您有一张2GB流量折扣（有效6个月）券，将于2019.12.08到期，请进入“广东移动手机营业厅”APP-优惠券兑换，官方兑换地址： http://dx.10086','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'顾问'},
        {'isdate':'2001','isphone':'106****204209757920','sendtimes':'10:25:15','smstype':'发送','sms_content':'尊敬的客户：您有一张2GB流量折扣（有效6个月）券，将于2019.12.08到期，请进入“广东移动手机营业厅”APP-优惠券兑换，官方兑换地址： http://dx.10086','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'部门主管'},
        {'isdate':'2001','isphone':'17515151214','sendtimes':'10:25:15','smstype':'发送','sms_content':'尊敬的客户：您有一张2GB流量折扣（有效6个月）券，将于2019.12.08到期，请进入“广东移动手机营业厅”APP-优惠券兑换，官方兑换地址： http://dx.10086','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'负责人'},
        {'isdate':'2001','isphone':'17515151214','sendtimes':'10:25:15','smstype':'发送','sms_content':'尊敬的客户：您有一张2GB流量折扣（有效6个月）券，将于2019.12.08到期，请进入“广东移动手机营业厅”APP-优惠券兑换，官方兑换地址： http://dx.10086','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'顾问'},
        {'isdate':'2001','isphone':'17515151214','sendtimes':'10:25:15','smstype':'接收','sms_content':'尊敬的客户：您有一张2GB流量折扣（有效6个月）券，将于2019.12.08到期，请进入“广东移动手机营业厅”APP-优惠券兑换，官方兑换地址： http://dx.10086','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'顾问'},
        {'isdate':'2001','isphone':'17515151214','sendtimes':'10:25:15','smstype':'接收','sms_content':'尊敬的客户：您有一张2GB流量折扣（有效6个月）券，将于2019.12.08到期，请进入“广东移动手机营业厅”APP-优惠券兑换，官方兑换地址： http://dx.10086','isname':'张三','department':'深圳一分-速贷一区-速贷一部','role':'顾问'},
    ]
});

Mock.mock('/api/data11',{
    'data|1-6':[{
    'title':'李晓强',
    'article':'测试111'
    }]
});
