<header class="overlap" id="header" data-sticky-container>
	<div class="grid-container">
        <div class="grid-x grid-padding-x">
            <div class="auto cell">
                <a href="/">
                    <div class="logo"></div>
                </a>
            </div>
            <div class="shrink cell show-for-medium">
                <nav>
                    <ul class="menu align-center ">
                        <li>
                            <a href="/about/">About</a>
                        </li>
<!--                        <li>-->
<!--                            <a href="/projects/">Projects</a>-->
<!--                        </li>-->
                        <li>
                            <a href="https://blog.sudo.org.au/">Blog</a>
                        </li>
                        <li>
                            <a href="https://discord.gg/sjF2y4G">Discord</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="auto cell text-right">
                <div @click="menu_open = !menu_open"  class="mobile-menu hide-for-medium">
                    <div class="bar"></div>
                </div>
                <div class="mobile-menu-popup">

                    <div class="popup" :class="{ active: menu_open }">
                        <a @click="menu_open = false" class="popupCloseButton">Close</a>
                        <h4>Main Menu</h4>
                        <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/about/">About</a>
                            </li>
<!--                            <li>-->
<!--                                <a href="/projects/">Projects</a>-->
<!--                            </li>-->
                            <li>
                                <hr>
                            </li>
                            <li>
                                <a href="https://blog.sudo.org.au/">Blog</a>
                            </li>
                            <li>
                                <a href="https://discord.gg/sjF2y4G">Discord</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <a @click="menu_open = false" href="<!--#echo var="signInURL" -->" class="signin show-for-medium">Sign In <i class="fa fa-chevron-right" aria-hidden="true"></i></i></a>
            </div>
        </div>
	</div>
</header>
