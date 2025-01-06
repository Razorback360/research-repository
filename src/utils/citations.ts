export const generateApa7Citation = ({
  authors,
  title,
  journal,
  volume,
  issue,
  startPage,
  endPage,
  publishDate,
  doiLink,
}: {
  authors: { authorFirst: string; authorMiddle?: string; authorLast: string }[];
  title: string;
  journal: string;
  volume?: string;
  issue?: string;
  startPage?: string;
  endPage?: string;
  publishDate: Date;
  doiLink?: string;
}): string => {
  let formattedAuthors = authors
    .map(
      (author) =>
        `${author.authorLast}, ${author.authorFirst[0]}.` +
        (author.authorMiddle ? ` ${author.authorMiddle[0]}.` : "")
    );

  if (formattedAuthors.length > 20) {
    formattedAuthors = formattedAuthors.slice(0, 1);
    formattedAuthors.push("et al.");
  } else {
    formattedAuthors = formattedAuthors.join(", ");
  }

const formattedDate = publishDate.getFullYear();

  let citation = `${formattedAuthors} (${formattedDate}). ${title}. *${journal}*`;

  if (volume) citation += `, *${volume}*`;
  if (issue) citation += `(${issue})`;
  if (startPage && endPage) citation += `, ${startPage}-${endPage}`;
  if (doiLink) citation += `. [https://doi.org/${doiLink}](https://doi.org/${doiLink})`;

  return citation;
};

export const generateChicagoCitation = ({
  authors,
  title,
  journal,
  volume,
  issue,
  startPage,
  endPage,
  publishDate,
  doiLink,
}: {
  authors: { authorFirst: string; authorMiddle?: string; authorLast: string }[];
  title: string;
  journal: string;
  volume?: string;
  issue?: string;
  startPage?: string;
  endPage?: string;
  publishDate: Date;
  doiLink?: string;
}): string => {
  let formattedAuthors = authors
    .map(
      (author) =>
        `${author.authorFirst} ${author.authorMiddle ? author.authorMiddle + " " : ""}${author.authorLast}`
    );

  if (formattedAuthors.length > 10) {
    formattedAuthors = formattedAuthors.slice(0, 1);
    formattedAuthors.push("et al.");
  } else {
    formattedAuthors = formattedAuthors.join(", ");
  }

const formattedDate = publishDate.getFullYear();

  let citation = `${formattedAuthors}. "${title}." *${journal}*`;

  if (volume) citation += ` ${volume}`;
  if (issue) citation += `, no. ${issue}`;
  if (startPage && endPage) citation += ` (${formattedDate}): ${startPage}-${endPage}`;
  if (doiLink) citation += `. [https://doi.org/${doiLink}](https://doi.org/${doiLink})`;

  return citation;
};