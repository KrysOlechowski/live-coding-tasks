---
schemaVersion: 1
plannedFollowUps: 0
primaryTopics:
  - "lookup-and-matching"
  - "normalization-and-lookups"
secondaryTopics:
  - "complexity-analysis"
---

# Interviewer Plan

## Difficulty calibration

- Diagnosis: 0
- Interactions: 0
- Edge cases: 1
- Conceptual depth: 1
- Change surface: 0
- Follow-up escalation: 0
- Total: 2
- Rating: easy
- Rationale: Dwie krótkie funkcje w jednym pliku ćwiczą jawnie wskazaną strukturę danych. Granice to puste wejście i brak klucza; jeden trade-off dotyczy budowy indeksu i późniejszych odczytów. Brak follow-upów utrzymuje zakres 15–25 minut.

## Core Task

### Purpose

Odizolować indeksowanie po ID od porównywania dwóch kolekcji i wymagań kolejności, które przeciążyły poprzednią próbę. Utrwalić praktyczne znaczenie klucza, wartości i ponownego użycia indeksu przed powrotem do większego zadania.

### Expected evidence

- Powiązuje każde ID z pełnym produktem i obejmuje wszystkie rekordy.
- Używa przekazanego indeksu do odczytu po kluczu bez skanowania kolekcji.
- Naturalnie obsługuje pusty indeks, brak ID i wielkość liter.
- Nie modyfikuje źródłowych rekordów ani indeksu podczas odczytu.
- Rozróżnia oczekiwany liniowy koszt budowania indeksu, średni stały koszt pojedynczego odczytu i liniową pamięć na wpisy.
- Rozumie, że referencje zapisane w indeksie również wymagają pamięci, ale nie oznaczają kopiowania całych produktów.

### Start questions

#### core-start-1

- Kind: prediction
- Topic: normalization-and-lookups
- Prompt: Jakiej pełnej wartości oczekujesz po odczycie ID "p-2" z indeksu zbudowanego na przykładowych produktach?
- Purpose: Potwierdzić, że kandydat odróżnia ID używane do wyszukania od pełnego produktu zwracanego jako wynik.
- Expected evidence: Wskazuje produkt Mouse z ID p-2 i ceną 4900, a nie sam identyfikator lub pozycję w tablicy.

### Checkpoint questions

#### core-checkpoint-1

- Kind: tradeoff
- Topic: complexity-analysis
- Prompt: Dla n produktów podaj osobno koszt zbudowania indeksu, jednego późniejszego odczytu oraz pamięci na indeks. Skąd bierze się każdy z tych kosztów w Twoim kodzie?
- Purpose: Sprawdzić, czy kandydat rozdziela budowę, odczyt i pamięć po wcześniejszym pomyleniu kosztu pojedynczej operacji z kosztem całego zadania.
- Expected evidence: Wyjaśnia oczekiwane O(n) budowy, średnie O(1) odczytu przy zadanych założeniach i O(n) pamięci na wpisy, bez twierdzenia, że cały indeks powstaje w stałym czasie.

#### core-checkpoint-2

- Kind: transfer
- Topic: lookup-and-matching
- Prompt: Co stałoby się z kosztem kolejnych odczytów, gdyby przed każdym z nich budować indeks od nowa?
- Purpose: Zweryfikować sens ponownego użycia indeksu, niezależnie od znajomości nazw metod Map.
- Expected evidence: Rozpoznaje ponoszenie kosztu budowy przy każdym odczycie i utratę korzyści z jednorazowego przygotowania danych.

### Review focus

- Poprawna relacja ID do produktu i odczyt z istniejącego indeksu.
- Brak skanowania wpisów oraz przebudowy podczas odczytu.
- Puste wejście, brak ID i brak mutacji podczas odczytu.
- Wyjaśnienie kosztów adekwatne do tej małej implementacji; nie wymagać znajomości wewnętrznej implementacji silnika JavaScript.
- Nie oceniać pominiętych obszarów poprzedniej próby, takich jak kolejność zmian czy porównywanie snapshotów.
