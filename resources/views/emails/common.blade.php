@component('mail::message')

{{-- Greeting --}}
@if (! empty($greeting))
# {{ $greeting }}
@else
@if ($level == 'error')
# {{ trans('email.greeting.error') }}
@else
# {{ trans('email.greeting.success') }}
@endif
@endif

{{-- Intro Lines --}}
@foreach ($introLines as $line)
{{ $line }}

@endforeach

{{-- Action Button --}}
@isset($actionText)
<?php
switch ($level) {
    case 'success':
        $color = 'green';
        break;
    case 'error':
        $color = 'red';
        break;
    case 'info':
        $color = 'blue';
}
?>
@component('mail::button', ['url' => $actionUrl, 'color' => $color])
{{ $actionText }}
@endcomponent
@endisset

{{-- Outro Lines --}}
@foreach ($outroLines as $line)
{{ $line }}

@endforeach

{{-- Salutation --}}
@if (! empty($salutation))
{{ $salutation }}
@else
{{ trans('email.salutation') }},<br>{{ config('app.name') }}
@endif

{{-- Subcopy --}}
@isset($actionText)
@component('mail::subcopy')
{{ trans('email.subcopy', ['actionText' => $actionText]) }} [{{ $actionUrl }}]({{ $actionUrl }})
@endcomponent
@endisset
@endcomponent