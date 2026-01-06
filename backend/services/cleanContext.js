export function cleanContext(docs = []) {
  console.log("docs==> ", docs);

  return docs
    .map((text) =>
      text
        .replace(/Question:/gi, "")
        .replace(/Answer:/gi, "")
        .replace(/\s+/g, " ")
        .trim()
    )
    .join("\n");
}
