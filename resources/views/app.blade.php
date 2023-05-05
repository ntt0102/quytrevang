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
    <div id="preload" style="left: 0; top: 0; width: 100%; height: 100%; position: fixed; background-color: #2A2A32;">
        <embed style="position: absolute; top: 50%; left: 50%; width: 200px; transform: translate(-50%, -50%);" src="{{ asset('images/android-chrome-reverse-512x512.svg') }}" />
    </div>
    @vite(['resources/js/app.js'])
</body>

</html>