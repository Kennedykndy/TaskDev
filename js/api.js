// api.js

async function traduzirComGoogle(texto) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt-BR&dt=t&q=${encodeURIComponent(
      texto,
    )}`;
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Google Translate falhou");
    }

    const dados = await resposta.json();
    if (Array.isArray(dados) && Array.isArray(dados[0])) {
      return dados[0].map((item) => item[0]).join("");
    }

    return null;
  } catch (erro) {
    console.warn("Tradutor Google não disponível:", erro.message);
    return null;
  }
}

async function traduzirComLibreTranslate(texto) {
  try {
    const resposta = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: texto,
        source: "en",
        target: "pt",
        format: "text",
      }),
    });

    if (!resposta.ok) {
      throw new Error("LibreTranslate falhou");
    }

    const dados = await resposta.json();
    return dados.translatedText ?? null;
  } catch (erro) {
    console.warn("LibreTranslate não disponível:", erro.message);
    return null;
  }
}

async function traduzirComMyMemory(texto) {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      texto,
    )}&langpair=en|pt-BR`;
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("MyMemory falhou");
    }

    const dados = await resposta.json();
    return dados?.responseData?.translatedText ?? null;
  } catch (erro) {
    console.warn("MyMemory não disponível:", erro.message);
    return null;
  }
}

async function traduzirParaPortugues(texto) {
  const tradutores = [
    traduzirComGoogle,
    traduzirComLibreTranslate,
    traduzirComMyMemory,
  ];

  for (const tradutor of tradutores) {
    const traducao = await tradutor(texto);
    if (traducao && traducao !== texto) {
      return traducao;
    }
  }

  return texto;
}

export async function buscarDica() {
  try {
    const resposta = await fetch("https://api.adviceslip.com/advice");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar dica externa");
    }

    const dados = await resposta.json();
    const dicaOriginal = dados.slip.advice;
    return await traduzirParaPortugues(dicaOriginal);
  } catch (erro) {
    console.warn("Não foi possível buscar ou traduzir a dica:", erro.message);
    return null;
  }
}
