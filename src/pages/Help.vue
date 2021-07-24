<template>
    <div class='columns'>
        <div class="column non-selectable" :class="navbarClass">
            <NavigationMenu view="help"
                            @clicked-installed="route('installed')"
                            @clicked-online="route('online')"
                            @clicked-settings="route('settings')"
                            @clicked-config-editor="goto('/config-editor')"
            />
        </div>
        <div class="column" :class="contentClass">
            <Hero title="Help" subtitle="Common problems and their potential solutions" hero-type="is-info"/>
            <div
                class="tabs sticky-top sticky-top--opaque sticky-top--no-shadow sticky-top--no-padding has-background-">
                <ul>
                    <li v-for="(key, index) in tabs" :key="`tab-${key}`"
                        :class="[{'is-active': activeTab === key}]"
                        @click="changeTab(key)">
                        <a>{{key}}</a>
                    </li>
                </ul>
            </div>
            <div class="container margin-right">
                <br/>
                <div ref="General" v-if="activeTab === 'General'">
                    <h2 class="title is-5">{{ $t('Help.gettingStarted.title')}}</h2>
                    <p>
                        <translation translationKey="Help.gettingStarted.howDownload"></translation>
                    </p>
                    <p>
                        <translation translationKey="Help.gettingStarted.howLaunchModded"></translation>
                        </p>
                    <hr/>
                    <h2 class='title is-5'>{{$t('Help.slowGame.title')}}</h2>
                    <p>
                        {{$t('Help.slowGame.probableCause')}}
                        <br/>
                        {{$t('Help.slowGame.binarySearch')}}
                        <br/><br/>
                        {{$t('Help.slowGame.maybeOptimisationMods')}}
                    </p>
                    <hr/>
                    <h2 class='title is-5'>{{$t('Help.dedicatedServer.title')}}</h2>
                    <p>
                        {{$t('Help.dedicatedServer.text')}}
                    </p>
                    <hr/>
                    <h2 class='title is-5'>Launching from Steam</h2>
                    <p>
                        By design your experience by starting the game through Steam will be vanilla (un-modded).
                        <br/>
                        You can change this yourself by passing <code>--doorstop-target "&lt;PATH&gt;"</code> as a game
                        launch argument. This is however not recommend as it's an extremely manual approach.
                        <br/><br/>
                        Replace <code>&lt;PATH&gt;</code> with the path to the profile you'd like to launch.
                        <br/><br/>
                        Your current argument would be:
                        <code v-if="doorstopTarget.length > 0">{{ doorstopTarget }}</code>
                        <code v-else>These parameters will be available after installing BepInEx.</code>
                    </p>
                </div>
                <div ref="Game won't start" v-if="activeTab === `Game won't start`">
                    <h2 class='title is-5'>A red box appears when I try to start the game</h2>
                    <p>Read the suggestion at the bottom of the red box.</p>
                    <hr/>
                    <h2 class='title is-5'>I'm taken to the Steam store page</h2>
                    <p>That's because you don't legally own the game. The manager only supports legal copies.</p>
                    <hr/>
                    <h2 class='title is-5'>A text window appears and closes immediately.</h2>
                    <p>Try running the preloader fix on the Settings screen.</p>
                    <p>If it persists, force exit Steam and start modded with Steam closed.</p>
                </div>
                <div ref="Mods not appearing" v-if="activeTab === 'Mods not appearing'">
                    <h2 class='title is-5'>Potential solutions</h2>
                    <p>The most common issues are solved by following the instructions exactly as listed
                        <Link target="external" url="https://github.com/ebkr/r2modmanPlus/wiki/Why-aren't-my-mods-working%3F">
                            here
                        </Link>
                    </p>
                </div>
                <div ref="Updating" v-if="activeTab === 'Updating'">
                    <h2 class='title is-5'>Auto-updates</h2>
                    <p>The manager updates automatically on close assuming an update is available.</p>
                    <p>Updates are downloaded in the background.</p>
                    <p>You may receive a prompt to run <i>old_uninstaller</i> as an admin. This is the updater.</p>
                    <p>If a problem occurs with an update, download and run the latest installer.</p>
                    <hr/>
                    <h2 class='title is-5'>I don't want updates</h2>
                    <p>
                        On GitHub there is a portable version that doesn't auto update. You are however prompted that an
                        update is available.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from 'vue-property-decorator';
    import NavigationMenuProvider from '../providers/components/loaders/NavigationMenuProvider';
    import Profile from '../model/Profile';
    import {Hero, Link, Translation} from '../components/all';
    import GameRunnerProvider from '../providers/generic/game/GameRunnerProvider';
    import R2Error from '../model/errors/R2Error';
    import Game from '../model/game/Game';
    import GameManager from '../model/game/GameManager';

    @Component({
        components: {
            Link,
            NavigationMenu: NavigationMenuProvider.provider,
            Hero,
            Translation
        }
    })
    export default class Help extends Vue {

        @Prop({ default: 'is-one-quarter' })
        private navbarClass!: string;

        @Prop({ default: 'is-three-quarters' })
        private contentClass!: string;

        private activeTab = 'General';
        private tabs = ['General', 'Game won\'t start', 'Mods not appearing', 'Updating'];
        private doorstopTarget = "";
        private activeGame!: Game;

        changeTab(key: string) {
            this.activeTab = key;
        }

        getActiveProfile(): Profile {
            return Profile.getActiveProfile();
        }

        route(ref: string) {
            this.$router.replace(`/manager?view=${ref}`);
        }

        goto(ref: string) {
            this.$router.replace(ref);
        }

        created() {
            this.activeGame = GameManager.activeGame;
        }

        mounted() {
            GameRunnerProvider.instance.getGameArguments(this.activeGame, Profile.getActiveProfile()).then(target => {
                if (target instanceof R2Error) {
                    this.doorstopTarget = "";
                } else {
                    this.doorstopTarget = target;
                }
            });
        }

    }
</script>
