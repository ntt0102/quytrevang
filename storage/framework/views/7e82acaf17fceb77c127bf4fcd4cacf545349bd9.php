<!doctype html>
<title>Site Maintenance</title>
<style>
    body {
        text-align: center;
        padding: 150px;
    }

    h1 {
        font-size: 50px;
    }

    body {
        font: 20px Helvetica, sans-serif;
        color: #333;
    }

    article {
        display: block;
        text-align: left;
        width: 650px;
        margin: 0 auto;
    }

    a {
        color: #dc8100;
        text-decoration: none;
    }

    a:hover {
        color: #333;
        text-decoration: none;
    }
</style>
<?php
$pr = app(\App\Repositories\ParameterRepository::class);
$ur = app(\App\Repositories\UserRepository::class);
$contactUser = $ur->findOne([['code', (int) $pr->getValue('representUser')]]);
?>
<center>
    <img width="300" src="../../../images/vertical-828x465.png" />

    <h1>Hệ thống đang bảo trì!</h1>
    <div>
        <p>Xin lỗi vì sự bất tiện này, chúng tôi sẽ sớm trở lại </p>
        <p>Nếu cần, quý khách có thể liên hệ với chúng tôi theo</p>
        <p>Số điện thoại: <?php echo e($contactUser->phone); ?>, Email: <?php echo e($contactUser->email); ?></p>
    </div>
</center><?php /**PATH C:\xampp\htdocs\resources\views/errors/503.blade.php ENDPATH**/ ?>