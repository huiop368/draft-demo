import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'

const { hasCommandModifier } = KeyBindingUtil

export default (e) => {
    switch(e.which){
        
    }

    return getDefaultKeyBinding(e)
}
