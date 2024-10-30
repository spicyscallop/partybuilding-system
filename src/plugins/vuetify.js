import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const lightTheme = {
    dark: false,
    colors: {
        'party-1': '#C83C23',
        'party-2': '#F35339',
    }
}

const navBarTheme = {
    variables: {
        'hover-opacity': 0.08,
        'focus-opacity': 0.12,
        'selected-opacity': 1,
        'activated-opacity': 1,
        'theme-on-party-1': '#F35339',
    }
}

export default createVuetify({
    theme: {
        defaultTheme: 'lightTheme',
        themes: {
            lightTheme,
            navBarTheme
        }
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    display: {},
    components,
    directives
})

