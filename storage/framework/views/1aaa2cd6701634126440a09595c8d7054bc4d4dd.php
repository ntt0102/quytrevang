<div class="overlay" id="preload">
    <style>
        * {
            box-sizing: border-box;
        }

        .overlay {
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            position: fixed;
            background-color: #2A2A32;
        }

        .overlay__inner {
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            position: absolute;
        }

        .overlay__content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .overlay__content>div {
            position: relative;
        }

        .spinner {
            position: absolute;
            width: 88px;
            height: 88px;
            top: calc(50% - 44px);
            left: calc(50% - 44px);
            animation: spinner 2s linear infinite;
            margin-top: -13.6px;
            transform: rotate(99deg);
        }

        img {
            position: absolute;
            top: calc(50% - 100px);
            left: calc(50% - 100px);
            height: 200px;
            width: 200px;
        }

        @keyframes  spinner {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    </style>
    <div class="overlay__inner">
        <div class="overlay__content">
            <div>
                <img src="<?php echo e(asset('images/android-chrome-reverse-512x512.png')); ?>" />
                <svg class="spinner">
                    <circle cx="50%" cy="50%" r="37" fill="none" stroke="#2A2A32" stroke-width="15" />
                    <circle cx="50%" cy="50%" r="37" fill="none" stroke="#FF5722" stroke-width="14" stroke-dasharray="221" />
                    <polygon points="72.7,35 86.4,32.5 86.3,32 86.1,31.5 85.7,30 85.3,29" fill="#FF5722" />
                    <polygon points="74,44 87.8,41.6 87.9,42.5 88,44 88,44.5" fill="#FF5722" />
                </svg>
            </div>
        </div>
    </div>
</div><?php /**PATH C:\xampp\htdocs\resources\views/partials/preload.blade.php ENDPATH**/ ?>