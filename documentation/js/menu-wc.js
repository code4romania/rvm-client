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
                    <a href="index.html" data-type="index-link">rvm-client documentation</a>
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
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
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
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-59173f07dc8fd2179883704b9a7d7082"' : 'data-target="#xs-components-links-module-AppModule-59173f07dc8fd2179883704b9a7d7082"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-59173f07dc8fd2179883704b9a7d7082"' :
                                            'id="xs-components-links-module-AppModule-59173f07dc8fd2179883704b9a7d7082"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CurrentProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CurrentProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TopBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TopBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationModule.html" data-type="entity-link">AuthenticationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthenticationModule-31f54fa31bb6c4c6a1bdd39c8b916247"' : 'data-target="#xs-components-links-module-AuthenticationModule-31f54fa31bb6c4c6a1bdd39c8b916247"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthenticationModule-31f54fa31bb6c4c6a1bdd39c8b916247"' :
                                            'id="xs-components-links-module-AuthenticationModule-31f54fa31bb6c4c6a1bdd39c8b916247"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecoverPasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecoverPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignupComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationRoutingModule.html" data-type="entity-link">AuthenticationRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-a8cc3177c5d6998a8cf7f206c061a70d"' : 'data-target="#xs-injectables-links-module-CoreModule-a8cc3177c5d6998a8cf7f206c061a70d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-a8cc3177c5d6998a8cf7f206c061a70d"' :
                                        'id="xs-injectables-links-module-CoreModule-a8cc3177c5d6998a8cf7f206c061a70d"' }>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CitiesCountiesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CitiesCountiesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ErrorMessageService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ErrorMessageService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FiltersService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FiltersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStorageService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocalStorageService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UsersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UtilService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UtilService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InfoModule.html" data-type="entity-link">InfoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InfoModule-7c45661519fe397283c029a4eb742d45"' : 'data-target="#xs-components-links-module-InfoModule-7c45661519fe397283c029a4eb742d45"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InfoModule-7c45661519fe397283c029a4eb742d45"' :
                                            'id="xs-components-links-module-InfoModule-7c45661519fe397283c029a4eb742d45"' }>
                                            <li class="link">
                                                <a href="components/InfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InfoRoutingModule.html" data-type="entity-link">InfoRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MapModule.html" data-type="entity-link">MapModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MapModule-1223306ebd62c32a4ff9076d00dc6157"' : 'data-target="#xs-components-links-module-MapModule-1223306ebd62c32a4ff9076d00dc6157"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MapModule-1223306ebd62c32a4ff9076d00dc6157"' :
                                            'id="xs-components-links-module-MapModule-1223306ebd62c32a4ff9076d00dc6157"' }>
                                            <li class="link">
                                                <a href="components/MapComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MapModule-1223306ebd62c32a4ff9076d00dc6157"' : 'data-target="#xs-injectables-links-module-MapModule-1223306ebd62c32a4ff9076d00dc6157"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MapModule-1223306ebd62c32a4ff9076d00dc6157"' :
                                        'id="xs-injectables-links-module-MapModule-1223306ebd62c32a4ff9076d00dc6157"' }>
                                        <li class="link">
                                            <a href="injectables/MapService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MapService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MapRoutingModule.html" data-type="entity-link">MapRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrganisationsModule.html" data-type="entity-link">OrganisationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OrganisationsModule-b7ebf06ccebd15dc55cab53d6dd68644"' : 'data-target="#xs-components-links-module-OrganisationsModule-b7ebf06ccebd15dc55cab53d6dd68644"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OrganisationsModule-b7ebf06ccebd15dc55cab53d6dd68644"' :
                                            'id="xs-components-links-module-OrganisationsModule-b7ebf06ccebd15dc55cab53d6dd68644"' }>
                                            <li class="link">
                                                <a href="components/NgodetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgodetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganisationEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganisationEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganisationaddComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganisationaddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganisationsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganisationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganisationsDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganisationsDashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OrganisationsModule-b7ebf06ccebd15dc55cab53d6dd68644"' : 'data-target="#xs-injectables-links-module-OrganisationsModule-b7ebf06ccebd15dc55cab53d6dd68644"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrganisationsModule-b7ebf06ccebd15dc55cab53d6dd68644"' :
                                        'id="xs-injectables-links-module-OrganisationsModule-b7ebf06ccebd15dc55cab53d6dd68644"' }>
                                        <li class="link">
                                            <a href="injectables/OrganisationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>OrganisationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganisationsRoutingModule.html" data-type="entity-link">OrganisationsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ResourcesModule.html" data-type="entity-link">ResourcesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ResourcesModule-c1762db8f87d6c4469f3d7114de7eeec"' : 'data-target="#xs-components-links-module-ResourcesModule-c1762db8f87d6c4469f3d7114de7eeec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ResourcesModule-c1762db8f87d6c4469f3d7114de7eeec"' :
                                            'id="xs-components-links-module-ResourcesModule-c1762db8f87d6c4469f3d7114de7eeec"' }>
                                            <li class="link">
                                                <a href="components/AddResourceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddResourceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditResourceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditResourceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImportResourcesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImportResourcesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResourceListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResourceListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResourcedetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResourcedetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResourcesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResourcesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResourcesdashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResourcesdashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ResourcesModule-c1762db8f87d6c4469f3d7114de7eeec"' : 'data-target="#xs-injectables-links-module-ResourcesModule-c1762db8f87d6c4469f3d7114de7eeec"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResourcesModule-c1762db8f87d6c4469f3d7114de7eeec"' :
                                        'id="xs-injectables-links-module-ResourcesModule-c1762db8f87d6c4469f3d7114de7eeec"' }>
                                        <li class="link">
                                            <a href="injectables/ResourcesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ResourcesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResourcesRoutingModule.html" data-type="entity-link">ResourcesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-31663f4c943d0d0f7dfc4e267bf19531"' : 'data-target="#xs-components-links-module-SharedModule-31663f4c943d0d0f7dfc4e267bf19531"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-31663f4c943d0d0f7dfc4e267bf19531"' :
                                            'id="xs-components-links-module-SharedModule-31663f4c943d0d0f7dfc4e267bf19531"' }>
                                            <li class="link">
                                                <a href="components/BackButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BackButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpinnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableSearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SharedModule-31663f4c943d0d0f7dfc4e267bf19531"' : 'data-target="#xs-directives-links-module-SharedModule-31663f4c943d0d0f7dfc4e267bf19531"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-31663f4c943d0d0f7dfc4e267bf19531"' :
                                        'id="xs-directives-links-module-SharedModule-31663f4c943d0d0f7dfc4e267bf19531"' }>
                                        <li class="link">
                                            <a href="directives/TableSortDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableSortDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link">UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersModule-ca78e90780793a8d783f6fa72dfeeeb4"' : 'data-target="#xs-components-links-module-UsersModule-ca78e90780793a8d783f6fa72dfeeeb4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-ca78e90780793a8d783f6fa72dfeeeb4"' :
                                            'id="xs-components-links-module-UsersModule-ca78e90780793a8d783f6fa72dfeeeb4"' }>
                                            <li class="link">
                                                <a href="components/AddUserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditUserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersRoutingModule.html" data-type="entity-link">UsersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/VolunteersModule.html" data-type="entity-link">VolunteersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VolunteersModule-fb1695cc074a95ec0bd0ce4f57fe4647"' : 'data-target="#xs-components-links-module-VolunteersModule-fb1695cc074a95ec0bd0ce4f57fe4647"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VolunteersModule-fb1695cc074a95ec0bd0ce4f57fe4647"' :
                                            'id="xs-components-links-module-VolunteersModule-fb1695cc074a95ec0bd0ce4f57fe4647"' }>
                                            <li class="link">
                                                <a href="components/AddVolunteerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddVolunteerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditVolunteerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditVolunteerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImportVolunteersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImportVolunteersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VolunteerDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VolunteerDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VolunteerDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VolunteerDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VolunteersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VolunteersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VolunteersRoutingModule.html" data-type="entity-link">VolunteersRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/BackButtonComponent.html" data-type="entity-link">BackButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InfoComponent.html" data-type="entity-link">InfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NgodetailsComponent.html" data-type="entity-link">NgodetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotFoundComponent.html" data-type="entity-link">NotFoundComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResourcesComponent.html" data-type="entity-link">ResourcesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SignupComponent.html" data-type="entity-link">SignupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SpinnerComponent.html" data-type="entity-link">SpinnerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableSearchComponent.html" data-type="entity-link">TableSearchComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TopBarComponent.html" data-type="entity-link">TopBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsersComponent.html" data-type="entity-link">UsersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VolunteerDetailsComponent.html" data-type="entity-link">VolunteerDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VolunteersComponent.html" data-type="entity-link">VolunteersComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#directives-links"' :
                                'data-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/TableSortDirective.html" data-type="entity-link">TableSortDirective</a>
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
                                <a href="classes/EmailValidation.html" data-type="entity-link">EmailValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocationValidation.html" data-type="entity-link">LocationValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordValidation.html" data-type="entity-link">PasswordValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/PhoneValidation.html" data-type="entity-link">PhoneValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/SsnValidation.html" data-type="entity-link">SsnValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/WebsiteValidation.html" data-type="entity-link">WebsiteValidation</a>
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
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CitiesCountiesService.html" data-type="entity-link">CitiesCountiesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DateParserFormatter.html" data-type="entity-link">DateParserFormatter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorMessageService.html" data-type="entity-link">ErrorMessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FiltersService.html" data-type="entity-link">FiltersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link">LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MapService.html" data-type="entity-link">MapService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganisationService.html" data-type="entity-link">OrganisationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResourcesService.html" data-type="entity-link">ResourcesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link">UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilService.html" data-type="entity-link">UtilService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VolunteerService.html" data-type="entity-link">VolunteerService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ApiPrefixInterceptor.html" data-type="entity-link">ApiPrefixInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/ErrorHandlerInterceptor.html" data-type="entity-link">ErrorHandlerInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AnonymousGuard.html" data-type="entity-link">AnonymousGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link">AuthenticationGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RedirectGuard.html" data-type="entity-link">RedirectGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link">RoleGuard</a>
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
                                <a href="interfaces/Alert.html" data-type="entity-link">Alert</a>
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
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
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