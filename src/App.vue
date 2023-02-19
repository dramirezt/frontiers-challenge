<template>
    <div id="app">
        <header class="background--white">
            <img src="@/assets/logo.svg" alt="Frontiers logo" width="160">
            <div class="text--size-medium">
                <p>
                    <b>Candidate:</b> Daniel Ramírez Torres &lt;<a class="text--size-medium"
                        href="mailto:dramireztorres@gmail.com" target="_blank">dramireztorres@gmail.com</a>&gt;
                </p>
                <p>
                    <b>Position:</b> Senior UI/UX Engineer
                </p>
                <p>
                    <b>Date:</b> February 2023
                </p>
            </div>
            <router-link class="nav text--weight-bold text--size-medium text--color-primary" :to="{ name: 'exercise-1' }">
                Exercise 1 - Paper panel
            </router-link>
            <router-link class="nav text--weight-bold text--size-medium text--color-primary" :to="{ name: 'exercise-2' }">
                Exercise 2 - Multi-level menu
            </router-link>
        </header>
        <main>
            <transition name="page-transition" tag="div">
                <router-view />
            </transition>
        </main>
    </div>
</template>

<style lang="scss" scoped>
header {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.08), 0px 14px 28px rgba(0, 0, 0, 0.1);
    margin-bottom: 100px;

    img {
        margin: 0 auto;
    }

    a {
        text-transform: none;
        position: relative;

        &.nav {
            display: flex;
            align-self: center;
            text-decoration: none;
        }

        &::before,
        &::after {
            content: ">";
            position: absolute;
            left: -20px;
            top: 50%;
            transform: translate(0, -50%);
            font-weight: bold;
            font-size: 16px;
            transition: all 0.3s ease-in-out;
            opacity: 0;
            animation: decorator-left 1.5s ease-in-out infinite;
        }

        &::after {
            content: "<";
            left: unset;
            right: -20px;
            animation: decorator-right 1.5s ease-in-out infinite;
        }

        &.router-link-active {
            &::before,
            &::after {
                opacity: 1;
            }
        }
    }
}

@keyframes decorator-left {
    0% {
        transform: translate(-5px, -50%);
    }

    50% {
        transform: translate(5px, -50%);
    }

    100% {
        transform: translate(-5px, -50%);
    }
}

@keyframes decorator-right {
    0% {
        transform: translate(5px, -50%);
    }

    50% {
        transform: translate(-5px, -50%);
    }

    100% {
        transform: translate(5px, -50%);
    }
}</style>