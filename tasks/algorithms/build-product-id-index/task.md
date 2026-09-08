---
title: "Katalog produktów po ID"
category: "algorithms"
taskType: "build-from-requirements"
difficulty: "easy"
primarySkill: "Build and query a product index using Map"
secondarySkill: "Distinguish index construction cost from individual lookup cost"
problemShape: "build-once-query-by-id"
interviewFocus: "Understanding Map keys and values through a reusable product index"
reviewFocus:
  - "correctness"
  - "performance"
  - "readability"
tags:
  - "typescript"
  - "map"
  - "indexing"
  - "big-o"
---

# Katalog produktów po ID

## Context

Aplikacja otrzymuje listę produktów. Później wielokrotnie potrzebuje odczytać pojedynczy produkt po jego ID, np. po kliknięciu pozycji w katalogu.

Indeks to tutaj kolekcja, w której każde ID jest powiązane z odpowiadającym mu produktem. Zbudujesz ją raz, a następnie wykorzystasz do kolejnych odczytów. Przewidywany czas: 15–25 minut.

## Goal

Uzupełnij dwie funkcje w `main.ts`: `buildProductIndex(products)` oraz `getProductById(index, id)`.

## Requirements

- `buildProductIndex` zwraca nową `Map<string, Product>`. Kluczem każdego wpisu jest `id`, a wartością cały odpowiadający mu produkt.
- Indeks zawiera wszystkie produkty z przekazanej listy. Pusta lista daje pusty indeks.
- `getProductById` korzysta z przekazanego indeksu i zwraca produkt o podanym ID. Jeśli takiego ID nie ma, zwraca `undefined`.
- Wielkość liter w ID ma znaczenie: `"p-1"` i `"P-1"` to różne klucze.
- Odczyt nie zmienia indeksu. Budowanie indeksu nie zmienia tablicy wejściowej ani produktów; możesz przechowywać referencje do istniejących obiektów.
- Budowanie indeksu powinno wykonać pracę liniową względem liczby produktów. Pojedynczy odczyt ma korzystać z klucza, bez przeglądania wszystkich wpisów i bez ponownego budowania indeksu.
- Po implementacji wyjaśnij osobno koszt budowy indeksu, pojedynczego odczytu oraz pamięć zajętą przez indeks. Przyjmujemy średni stały koszt dostępu do klucza i amortyzowany stały koszt dodania wpisu.

## Constraints

- Dane są poprawne, a ID unikalne w obrębie listy. Nie trzeba obsługiwać duplikatów ani walidować danych.
- Użyj wbudowanego `Map`; kod startowy zawiera potrzebne typy.
- Zakres obejmuje wyłącznie budowanie indeksu i odczyt. Nie potrzeba UI, porównywania dwóch list, sortowania ani aktualizacji produktów.

## Acceptance Criteria

- Dla trzech przykładowych produktów indeks ma trzy wpisy.
- Odczyt `"p-2"` zwraca produkt `{ id: "p-2", name: "Mouse", priceCents: 4900 }`.
- Odczyty `"missing"` i `"P-2"` zwracają `undefined`.
- Odczyt dowolnego ID z pustego indeksu zwraca `undefined`.
- Kilka kolejnych odczytów korzysta z tego samego indeksu i nie zmienia jego zawartości.
- Wejściowa lista i produkty pozostają niezmienione.

Kod startowy zwraca na razie pusty indeks i `undefined`. Te wartości są miejscami do uzupełnienia, a nie gotowym rozwiązaniem.
