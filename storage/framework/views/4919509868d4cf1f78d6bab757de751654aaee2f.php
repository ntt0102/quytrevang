<!DOCTYPE html>
<html lang="<?php echo e(app()->getLocale()); ?>">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
    <meta name="base-url" content="<?php echo e(Request::root()); ?>">
    <meta name="app-name" content="<?php echo e(config('app.name')); ?>">
    <meta name="description" content="<?php echo e(config('app.name')); ?>">
    <meta name="theme-color" content="#2A2A32" />
    <link rel="apple-touch-icon" href="images/icons/logo/apple-touch-icon.png">
    <link rel="stylesheet" href="<?php echo e(mix('css/app.css')); ?>">
    <link rel="manifest" href="/manifest.json">
</head>

<body class="dx-viewport">
    <div id="app"></div>
    <div id="preload" style="left: 0; top: 0; width: 100%; height: 100%; position: fixed; background-color: #2A2A32;">
        <embed style="position: absolute; top: 50%; left: 50%; width: 200px; transform: translate(-50%, -50%);" src="<?php echo e(asset('images/android-chrome-reverse-512x512.svg')); ?>" />
    </div>
    <script src="<?php echo e(mix('js/app.js')); ?>"></script>
</body>

</html><?php /**PATH C:\xampp\htdocs\resources\views/app.blade.php ENDPATH**/ ?>