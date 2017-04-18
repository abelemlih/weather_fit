//Conversion tools to convert between different measurement standards

export function kelvin_to_celsius (kelvin: number) {
  let celsius = kelvin - 273.15;
  return celsius
}

export function kelvin_to_fahrenheit (kelvin: number) {
  let fahrenheit = (kelvin*(9/5)) - 459.67;
  return fahrenheit
}