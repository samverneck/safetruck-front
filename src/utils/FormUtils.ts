declare var $: any

export class FormUtils {
  constructor(){}

  serialize(formId: string) {
    let form = $(formId)
    let obj = {}
    let data = $(form).serializeArray()
    data.map((input) => {
      if (obj[input.name] !== undefined) {
        if (!obj[input.name].push) {
          obj[input.name] = [obj[input.name]]
        }
        obj[input.name].push(input.value || '')
      } else {
        obj[input.name] = input.value || ''
      }
    })

    return obj
  }

  slugfy(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '')            // Remove spaces
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '')          // Remove multiple -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '')             // Trim - from end of text
  }

  clear(formId: string) {
    let form = $(formId)
    let el = form.serializeArray()
    form.trigger('reset')
    el.map((input) => {
      $(`[name="${input.name}"]`).removeClass('error')
    })
  }

}


