<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="base-url" content="{{ Request::root() }}">
    <meta name="app-name" content="{{ config('app.name') }}">
    <meta name="description" content="{{ config('app.name') }}">
    <meta name="theme-color" content="#2A2A32" />
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.json">
</head>

<body class="dx-viewport">
    <div id="app"></div>
    <div id="preload" style="position: fixed; left: 0; top: 0; width: 100vw; height: 100vh; background: #2A2A32; z-index: 1501; display: flex; align-items: center; justify-content: center; flex-direction: column;">
        <div style="position: relative; width: 130px; height: 130px;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 8px solid #515159; border-top: 8px solid #009688; border-radius: 50%; animation: spin 1s linear infinite; box-sizing: border-box;"></div>
            <img src="{{ asset('images/logo-nobg.png') }}" alt="Logo" style="position: absolute; top: 50%; left: 50%; width: 100px; height: 100px; transform: translate(-50%, -50%); background: none;" />
        </div>
        <div style="margin-top: 24px; color: #d3a238; font-size: 1.2rem; letter-spacing: 1px; font-family: sans-serif; text-transform: uppercase;">
            {{ config('app.name') }}
        </div>
    </div>
    @vite(['resources/js/app.js'])
</body>
<style>
    body {
        line-height: 1.2857;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>

</html>