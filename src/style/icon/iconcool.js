!(function () {
    var svgCode = '<svg xmlns="http://www.w3.org/2000/svg" data-name="body-3d" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0;visibility:hidden"><symbol id="icon-scale" viewBox="0 0 1024 1024"><path d="M1024 288h-64V64H736.002V0H1024v288z"/><path d="M551.263 427.904L969.601 9.536l45.246 45.248-418.367 418.4-45.217-45.28zM288 1024H0V735.998h64V960h224v64z"/><path d="M9.274 969.216l418.144-418.177 45.248 45.25-418.144 418.173-45.248-45.246zM191.994 352h-64V128h224v64h-160v160zm-64 64h64v192.002h-64V416zm288-288h191.999v64h-192v-64zm480.001 768H671.993v-64h160.002V671.998h64V896zm-64-480h64v192.002h-64V416zM415.994 832h191.999v64h-192v-64z"/></symbol><symbol id="icon-rotate" viewBox="0 0 1070.545 1024"><path d="M808.75 478.17V147.928L535.269 0 261.455 148.26v329.91l273.478 148.262L808.75 478.171zm-66.788-39.734L566.99 533.271V328.577l174.973-102.18v212.04zM535.268 75.8l172.302 93.163L535.268 269.14l-166.96-97.504-5.008-3.005L535.268 75.8zm-33.392 455.8l-171.968-93.164V226.063L501.876 326.24V531.6zm425.081-133.568a33.39 33.39 0 00-24.78-2.481 33.385 33.385 0 00-19.61 15.358 33.397 33.397 0 00-3.524 24.655 33.403 33.403 0 0014.523 20.236c71.121 41.738 110.527 93.162 110.527 145.255 0 92.16-125.557 179.982-304.869 213.71a33.553 33.553 0 00-12.553 3.69 33.583 33.583 0 00-10.18 8.216 33.59 33.59 0 00-6.264 11.482 33.618 33.618 0 00-1.392 13.01 33.616 33.616 0 003.691 12.548 33.527 33.527 0 008.215 10.18 33.455 33.455 0 0011.488 6.265 33.506 33.506 0 0013.004 1.392h6.345c217.716-42.073 358.963-152.27 358.963-280.493 0-76.8-52.09-148.928-143.584-203.023zM465.15 826.452C243.093 809.42 66.784 713.253 66.784 601.055c0-60.439 50.422-106.519 92.83-133.566a33.394 33.394 0 00-11.827-60.229 33.392 33.392 0 00-24.905 4.463C43.743 464.148 0 531.6 0 601.72 0 753.99 200.352 875.869 465.15 894.236V994.41l169.632-135.568L465.15 723.27v103.182z"/></symbol><symbol id="icon-reset" viewBox="0 0 1170.286 1024"><path d="M1056.79 312.458c-25.9-60.93-62.998-115.64-110.204-162.61-47.2-46.97-102.254-83.852-163.482-109.623C719.686 13.532 652.649-.001 582.808-.001V116.18c228.23 0 398.77 168.075 398.77 395.437 0 227.36-170.292 395.844-398.77 395.844-228.478 0-394.282-174.167-394.282-401.531 0-43.42-.528-68.958 12.597-109.521l81.47 40.748-2.898-160.488-2.899-160.489-138.22 82.744L.357 281.666l99.544 54.84C79.38 392.44 68.99 451.178 68.99 511.618c0 69.047 13.6 136.055 40.423 199.162 25.898 60.93 62.961 115.64 110.162 162.613 47.201 46.965 102.178 83.85 163.407 109.619 63.417 26.69 130.753 40.228 200.14 40.228 69.384 0 136.719-13.538 200.136-40.228 61.227-25.768 116.202-62.654 163.4-109.62 47.2-46.972 84.261-101.683 110.161-162.612 26.822-63.107 40.412-130.115 40.412-199.16 0-69.048-13.62-136.054-40.441-199.161z"/></symbol><symbol id="icon-undo" viewBox="0 0 1092.267 1024"><path d="M223.762 181.148h411.365a389.105 389.105 0 01275.148 113.97 389.11 389.11 0 01113.97 275.15 389.114 389.114 0 01-389.119 389.117H116.301a64.839 64.839 0 01-45.858-18.991A64.857 64.857 0 01116.3 829.679h518.827a259.392 259.392 0 00183.431-75.98 259.383 259.383 0 0075.981-183.43c0-68.801-27.327-134.784-75.98-183.433a259.41 259.41 0 00-183.432-75.981h-415.97l75.036 75.035a64.849 64.849 0 0119.763 46.099 64.85 64.85 0 01-65.46 65.368 64.855 64.855 0 01-46.07-19.829L19.02 294.188a64.853 64.853 0 010-91.768L202.426 19.015a64.866 64.866 0 1191.767 91.703l-70.43 70.43z"/></symbol><symbol id="icon-cloth" viewBox="0 0 1024 1024"><path d="M936.672 193.216l-226.88-64c-8.704-2.528-18.112-1.12-25.824 3.776-7.68 4.864-12.896 12.736-14.432 21.728C656.576 231.936 590.272 288 512 288c-30.56 0-56.16-13.12-79.296-27.296-15.04-9.216-34.752-4.512-44 10.56s-4.512 34.752 10.56 44C428.896 333.44 465.44 352 512 352c97.664 0 181.952-62.272 212.096-152.288L896 248.224V472.96l-121.728-24.352c-9.408-1.888-19.168.576-26.56 6.624C740.32 461.344 736 470.4 736 480v352c0 17.664-14.336 32-32 32H320c-17.632 0-32-14.336-32-32V448a31.93 31.93 0 00-11.712-24.736c-7.424-6.08-17.152-8.576-26.56-6.624L128 440.96V248.128l200.8-57.376c16.992-4.864 26.816-22.56 21.984-39.552-4.832-16.96-22.56-26.816-39.552-21.984l-224 64C73.472 197.152 64 209.728 64 224v256a31.93 31.93 0 0011.712 24.736c7.392 6.08 17.152 8.512 26.56 6.624L224 487.04V832c0 52.928 43.072 96 96 96h384c52.928 0 96-43.072 96-96V519.04l121.728 24.352c9.44 1.92 19.2-.544 26.56-6.624C955.68 530.656 960 521.6 960 512V224c0-14.336-9.536-26.912-23.328-30.784z"/><path d="M320 768c0 17.696 14.336 32 32 32h320c17.696 0 32-14.304 32-32s-14.304-32-32-32H352c-17.664 0-32 14.304-32 32z"/></symbol></svg>'
    if (document.body) {
        document.body.insertAdjacentHTML('afterbegin', svgCode)
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            document.body.insertAdjacentHTML('afterbegin', svgCode)
        })
    }
})()