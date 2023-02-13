'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">hwangminji documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-ff51349c05e45b42e8d70253dc6262fc052ee4bfb374ddd6f93464490b3f57677086dc6b1b282fdac844134b5437dc7761c74892f79cf273f415478969c31ebd"' : 'data-target="#xs-controllers-links-module-AppModule-ff51349c05e45b42e8d70253dc6262fc052ee4bfb374ddd6f93464490b3f57677086dc6b1b282fdac844134b5437dc7761c74892f79cf273f415478969c31ebd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-ff51349c05e45b42e8d70253dc6262fc052ee4bfb374ddd6f93464490b3f57677086dc6b1b282fdac844134b5437dc7761c74892f79cf273f415478969c31ebd"' :
                                            'id="xs-controllers-links-module-AppModule-ff51349c05e45b42e8d70253dc6262fc052ee4bfb374ddd6f93464490b3f57677086dc6b1b282fdac844134b5437dc7761c74892f79cf273f415478969c31ebd"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-ff51349c05e45b42e8d70253dc6262fc052ee4bfb374ddd6f93464490b3f57677086dc6b1b282fdac844134b5437dc7761c74892f79cf273f415478969c31ebd"' : 'data-target="#xs-injectables-links-module-AppModule-ff51349c05e45b42e8d70253dc6262fc052ee4bfb374ddd6f93464490b3f57677086dc6b1b282fdac844134b5437dc7761c74892f79cf273f415478969c31ebd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-ff51349c05e45b42e8d70253dc6262fc052ee4bfb374ddd6f93464490b3f57677086dc6b1b282fdac844134b5437dc7761c74892f79cf273f415478969c31ebd"' :
                                        'id="xs-injectables-links-module-AppModule-ff51349c05e45b42e8d70253dc6262fc052ee4bfb374ddd6f93464490b3f57677086dc6b1b282fdac844134b5437dc7761c74892f79cf273f415478969c31ebd"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-8b4f31d482b00238c055deb4cdd2ad2db4b4a1930b75c92a040727f62832f534367a4794698a8a5907549590d90fb0d400acc6431037b4fcda48027612e2ba0c"' : 'data-target="#xs-controllers-links-module-AuthModule-8b4f31d482b00238c055deb4cdd2ad2db4b4a1930b75c92a040727f62832f534367a4794698a8a5907549590d90fb0d400acc6431037b4fcda48027612e2ba0c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-8b4f31d482b00238c055deb4cdd2ad2db4b4a1930b75c92a040727f62832f534367a4794698a8a5907549590d90fb0d400acc6431037b4fcda48027612e2ba0c"' :
                                            'id="xs-controllers-links-module-AuthModule-8b4f31d482b00238c055deb4cdd2ad2db4b4a1930b75c92a040727f62832f534367a4794698a8a5907549590d90fb0d400acc6431037b4fcda48027612e2ba0c"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-8b4f31d482b00238c055deb4cdd2ad2db4b4a1930b75c92a040727f62832f534367a4794698a8a5907549590d90fb0d400acc6431037b4fcda48027612e2ba0c"' : 'data-target="#xs-injectables-links-module-AuthModule-8b4f31d482b00238c055deb4cdd2ad2db4b4a1930b75c92a040727f62832f534367a4794698a8a5907549590d90fb0d400acc6431037b4fcda48027612e2ba0c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-8b4f31d482b00238c055deb4cdd2ad2db4b4a1930b75c92a040727f62832f534367a4794698a8a5907549590d90fb0d400acc6431037b4fcda48027612e2ba0c"' :
                                        'id="xs-injectables-links-module-AuthModule-8b4f31d482b00238c055deb4cdd2ad2db4b4a1930b75c92a040727f62832f534367a4794698a8a5907549590d90fb0d400acc6431037b4fcda48027612e2ba0c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FacebookStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FacebookStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link" >EmailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailModule-c62c3d1b78a1bfca58f393fec29d402ec5267d384478112388277105c597016863d773e8a012c743fa1bc55fcfba59d78df8910b8184f459741b599caff5802d"' : 'data-target="#xs-injectables-links-module-EmailModule-c62c3d1b78a1bfca58f393fec29d402ec5267d384478112388277105c597016863d773e8a012c743fa1bc55fcfba59d78df8910b8184f459741b599caff5802d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailModule-c62c3d1b78a1bfca58f393fec29d402ec5267d384478112388277105c597016863d773e8a012c743fa1bc55fcfba59d78df8910b8184f459741b599caff5802d"' :
                                        'id="xs-injectables-links-module-EmailModule-c62c3d1b78a1bfca58f393fec29d402ec5267d384478112388277105c597016863d773e8a012c743fa1bc55fcfba59d78df8910b8184f459741b599caff5802d"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductModule-2552e65e8c5e26d1c22535ad1560f13fb21229606d0f9ac4980de00d3d8506b42ace6205df4110a1f2af451ad496e72f2f5863c67fc07915f3fc68075447cebc"' : 'data-target="#xs-controllers-links-module-ProductModule-2552e65e8c5e26d1c22535ad1560f13fb21229606d0f9ac4980de00d3d8506b42ace6205df4110a1f2af451ad496e72f2f5863c67fc07915f3fc68075447cebc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-2552e65e8c5e26d1c22535ad1560f13fb21229606d0f9ac4980de00d3d8506b42ace6205df4110a1f2af451ad496e72f2f5863c67fc07915f3fc68075447cebc"' :
                                            'id="xs-controllers-links-module-ProductModule-2552e65e8c5e26d1c22535ad1560f13fb21229606d0f9ac4980de00d3d8506b42ace6205df4110a1f2af451ad496e72f2f5863c67fc07915f3fc68075447cebc"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductModule-2552e65e8c5e26d1c22535ad1560f13fb21229606d0f9ac4980de00d3d8506b42ace6205df4110a1f2af451ad496e72f2f5863c67fc07915f3fc68075447cebc"' : 'data-target="#xs-injectables-links-module-ProductModule-2552e65e8c5e26d1c22535ad1560f13fb21229606d0f9ac4980de00d3d8506b42ace6205df4110a1f2af451ad496e72f2f5863c67fc07915f3fc68075447cebc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-2552e65e8c5e26d1c22535ad1560f13fb21229606d0f9ac4980de00d3d8506b42ace6205df4110a1f2af451ad496e72f2f5863c67fc07915f3fc68075447cebc"' :
                                        'id="xs-injectables-links-module-ProductModule-2552e65e8c5e26d1c22535ad1560f13fb21229606d0f9ac4980de00d3d8506b42ace6205df4110a1f2af451ad496e72f2f5863c67fc07915f3fc68075447cebc"' }>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-0288cd2de8754742d7f6c39d100977d8973255b4d9bc9b4b0a546faa2aa7a1330f5f166aff2499e23dec4e14bdaf9cd48181d7044c10909085a2be62ca02d440"' : 'data-target="#xs-controllers-links-module-UserModule-0288cd2de8754742d7f6c39d100977d8973255b4d9bc9b4b0a546faa2aa7a1330f5f166aff2499e23dec4e14bdaf9cd48181d7044c10909085a2be62ca02d440"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-0288cd2de8754742d7f6c39d100977d8973255b4d9bc9b4b0a546faa2aa7a1330f5f166aff2499e23dec4e14bdaf9cd48181d7044c10909085a2be62ca02d440"' :
                                            'id="xs-controllers-links-module-UserModule-0288cd2de8754742d7f6c39d100977d8973255b4d9bc9b4b0a546faa2aa7a1330f5f166aff2499e23dec4e14bdaf9cd48181d7044c10909085a2be62ca02d440"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-0288cd2de8754742d7f6c39d100977d8973255b4d9bc9b4b0a546faa2aa7a1330f5f166aff2499e23dec4e14bdaf9cd48181d7044c10909085a2be62ca02d440"' : 'data-target="#xs-injectables-links-module-UserModule-0288cd2de8754742d7f6c39d100977d8973255b4d9bc9b4b0a546faa2aa7a1330f5f166aff2499e23dec4e14bdaf9cd48181d7044c10909085a2be62ca02d440"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-0288cd2de8754742d7f6c39d100977d8973255b4d9bc9b4b0a546faa2aa7a1330f5f166aff2499e23dec4e14bdaf9cd48181d7044c10909085a2be62ca02d440"' :
                                        'id="xs-injectables-links-module-UserModule-0288cd2de8754742d7f6c39d100977d8973255b4d9bc9b4b0a546faa2aa7a1330f5f166aff2499e23dec4e14bdaf9cd48181d7044c10909085a2be62ca02d440"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Product.html" data-type="entity-link" >Product</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ConfirmAuthenticate.html" data-type="entity-link" >ConfirmAuthenticate</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfirmEmailDto.html" data-type="entity-link" >ConfirmEmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/FacebookAuthGuard.html" data-type="entity-link" >FacebookAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/RequestWithUserInterface.html" data-type="entity-link" >RequestWithUserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenPayload.html" data-type="entity-link" >TokenPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VerificationTokenPayloadInterface.html" data-type="entity-link" >VerificationTokenPayloadInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});