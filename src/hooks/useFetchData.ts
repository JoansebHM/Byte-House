import { useState, useEffect } from "react";
import type { Product } from "../types/product.type";

function useFetchData(url: string) {
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        const formatedResult = csvToJsonPro(result);
        setData(formatedResult);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetchData;

export function csvToJsonPro(csv: string) {
  const rows = [];
  let current = "";
  let insideQuotes = false;

  const chars = csv.split("");

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const next = chars[i + 1];

    if (char === '"') {
      if (insideQuotes && next === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "\n" && !insideQuotes) {
      rows.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  rows.push(current);

  const headers = rows[0].split(",");

  return rows.slice(1).map((row) => {
    const result: any = {};
    let col = "";
    let inside = false;
    const cols = [];

    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      const next = row[i + 1];

      if (char === '"') {
        if (inside && next === '"') {
          col += '"';
          i++;
        } else {
          inside = !inside;
        }
      } else if (char === "," && !inside) {
        cols.push(col);
        col = "";
      } else {
        col += char;
      }
    }
    cols.push(col);

    headers.forEach((header, index) => {
      result[header] = cols[index] ?? "";
    });

    // -------------------------
    //  TRANSFORMACIONES
    // -------------------------

    // Convertir images en array
    if (result.images) {
      result.images = result.images
        .split("|")
        .map((img: string) => img.trim())
        .filter((img: string) => img.length > 0);
    } else {
      result.images = [];
    }

    // Limpiar claves y valores
    for (const key in result) {
      const cleanKey = key.replace(/\r/g, "");
      const cleanValue =
        typeof result[key] === "string"
          ? result[key].replace(/\r/g, "")
          : result[key];

      if (cleanKey !== key) delete result[key];

      result[cleanKey] = cleanValue;
    }

    // Convertir numéricos
    if (result.price) result.price = Number(result.price);
    if (result.stock) result.stock = Number(result.stock);

    return result;
  });
}
