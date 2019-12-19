const Mock=require('mockjs');

//好友微信
Mock.mock('/api/haoyouweixin',{
    'data|1-1':[
        {
            'isid':'1512','images1':'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80','wx_id1':'BigMiao-xzt',
            'wx_name1':'大喵',
            'beizhu':'这是大喵喵',
            'images2':'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
            'wx_id2':'微信昵称',
            'wx_name2':'微信昵称微信昵称',
            'follow_up':'张三 18628458525',
            'last_time':'2019-11-29 10:42',
        },
        {
            'isid':'1512','images1':'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80','wx_id1':'BigMiao-xzt',
            'wx_name1':'大喵',
            'beizhu':'这是大喵喵',
            'images2':'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
            'wx_id2':'微信昵称',
            'wx_name2':'微信昵称微信昵称',
            'follow_up':'张三 18628458525',
            'last_time':'2019-11-29 10:42',
        },
    ]
});
//通话记录
Mock.mock('/api/tonghuajilu',{
    'data|1-1':[
        {'id':'1251','isdate':'2019-12-05 周四','isname':'张三1','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1252','isdate':'2019-12-05 周四','isname':'张三2','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1253','isdate':'2019-12-05 周四','isname':'张三3','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1254','isdate':'2019-12-05 周四','isname':'张三4','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1255','isdate':'2019-12-05 周四','isname':'张三5','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1256','isdate':'2019-12-05 周四','isname':'张三6','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1257','isdate':'2019-12-05 周四','isname':'张三7','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1258','isdate':'2019-12-05 周四','isname':'张三8','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1259','isdate':'2019-12-05 周四','isname':'张三9','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1210','isdate':'2019-12-05 周四','isname':'张三0','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1211','isdate':'2019-12-05 周四','isname':'张三','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1212','isdate':'2019-12-05 周四','isname':'张三','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1214','isdate':'2019-12-05 周四','isname':'张三','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
    ]
});
//通话记录弹层
Mock.mock('/api/tonghuajilu2',{
    'data|1-1':[
        {'id':'1251','isdate':'2019-12-05 周四','isname':'李四','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1251','isdate':'2019-12-05 周四','isname':'李四','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1251','isdate':'2019-12-05 周四','isname':'李四','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1251','isdate':'2019-12-05 周四','isname':'李四','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1251','isdate':'2019-12-05 周四','isname':'李四','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
        {'id':'1251','isdate':'2019-12-05 周四','isname':'李四','department':'技术部','role':'顾问','breatheout1':'12','breatheout2':'2','breatheout3':'69%','breatheout4':'18分19秒','breatheout5':'2分54秒','inbound1':'2','inbound2':'3','inbound3':'100%','inbound4':'18分19秒','inbound5':'2分54秒','callz':'34','jietongz':'55','gailv':'75','stonghua_time':'18分19秒','pingjun_time':'18分19秒'},
    ]
});
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
