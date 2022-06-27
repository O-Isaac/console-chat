import kleur from 'kleur'

const icons = {
  info: kleur.blue('ℹ'),
  success: kleur.green('✔'),
  warning: kleur.yellow('⚠'),
  error: kleur.red('✖')
}

interface SymbolsTypes {
    success: string;
    info: string,
    error: string
    warning: string
}

export default <SymbolsTypes> {
  success: icons.success,
  info: icons.info,
  error: icons.error,
  warning: icons.warning
}
