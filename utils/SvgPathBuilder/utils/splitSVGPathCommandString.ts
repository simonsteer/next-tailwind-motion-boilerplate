const cmdStartRegex = /[lLmMsSaAcCzZ]/

/**
 * Breaks up an SVG path into individual commands, eg:
 * `"M550.596 725.637L550.595 725.638"` becomes `["M550.596 725.637", "L550.595 725.638"]`
 */
export function splitSVGPathCommandString(path: string) {
  return path
    .replace(/\n/g, '') // get rid of any newlines
    .split('') // split into individual characters
    .reduce((acc, char) => {
      // if the character is a letter, it's the start of a new command,
      // so we should add a new empty string to our array of commands
      if (cmdStartRegex.test(char)) acc.push('')
      if (!acc[acc.length - 1]) acc[acc.length - 1] = '' // set the command to an empty string if it doesn't exist
      acc[acc.length - 1] += char // add character to the current commmand

      return acc
    }, [] as string[])
}
