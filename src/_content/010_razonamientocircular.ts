const content = {
  title: `Razonamiento circular`,
  description: `La falacia circular es una falacia lógica que se basa en poner a prueba una proposición mediante un proceso de razonamiento circular, el cual retona a la misma afirmación expuesta, para finalmente presentar este razonamiento como demostración de su veracidad.

  Este modo de proceder no demuestra ni la veracidad ni la falsedad de la proposición, sin embargo la presenta como el resultado lógico de un razonamiento correcto, y por tanto como una conclusión verdadera.
  `,
  examples: [
    {
      body: `El libro de Bob está muy bien escrito, porque Bob es un muy buen escritor.`,
    }, {
      body: `América es el mejor país para vivir, porque es mejor que el resto de países.`,
    },
  ],
  quiz: [
    { correct: true, text: `aaa` },
    { text: `bbb` },
    { text: `ccc` },
  ],
}

export default content
