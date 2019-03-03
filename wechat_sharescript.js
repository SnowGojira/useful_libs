var imgUrl,title,content,share_url;
window.shareData = {
        "imgUrl": imgUrl,
        "tfTitle": title,
        "tTitle": title,
        "tContent": content,
        'share_url': share_url
    };
    var urlstr = encodeURI(window.location.href);
    $.getJSON("https://zhiyan.zxhong.com/weixin/beike/wxapi/index.php?method=jssdk&callback=?", {
        url: urlstr
    }, function(json_data) {
        wx.config({
            debug: false,
            appId: json_data.appId,
            timestamp: json_data.timestamp,
            nonceStr: json_data.nonceStr,
            signature: json_data.signature,
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems']
        });
        wx.error(function(res) {
            //alert(res.errMsg);

        });
        wx.ready(function() {
            //alert("成功");
            share_data();

        });
    })

    function share_data() {
        wx.onMenuShareTimeline({
            title: window.shareData.tfTitle,
            link: window.shareData.share_url,
            imgUrl: window.shareData.imgUrl,
            success: function() {
                //share_num();
            },
            cancel: function() {}
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: window.shareData.tTitle,
            desc: window.shareData.tContent,
            link: window.shareData.share_url,
            imgUrl: window.shareData.imgUrl,
            success: function() {
                //share_num();
            },
            cancel: function() {

            }
        });

        wx.hideMenuItems({
            menuList: [
                "menuItem:originPage", "menuItem:share:email" , "menuItem:share:weiboApp", "menuItem:share:facebook", "menuItem:favorite"
            ]
        });
    }