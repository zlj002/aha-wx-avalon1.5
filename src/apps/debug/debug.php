<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="format-detection" content="telephone=no, email=no" />
    <title>Ahaschool</title>
    <link href="<%= htmlWebpackPlugin.options.publicPath %>assets/lib/flexible/flexible.css" rel="stylesheet">
    <script src="<%= htmlWebpackPlugin.options.publicPath %>assets/lib/flexible/flexible.js"></script>
</head>

<body ms-controller="root" class="index">

    <div ms-view="" class="view">
        <div class="viewloading">
            努力加载中..
        </div>
    </div>

    <script src="//res.wx.qq.com/open/js/jweixin-1.1.0.js"></script>
</body>

</html>