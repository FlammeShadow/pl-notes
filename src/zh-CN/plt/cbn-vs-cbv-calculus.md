# λ 演算 vs. λᵥ 演算

## 前言

本文适合已经了解 λ 演算的读者阅读。

## 概要

原始的 λ 演算由 A. Church 提出，其按名称传入（call-by-name）参数。而 G. D. Plotkin 首次系统阐述的 λᵥ 演算按值传入（call-by-value）参数。
本文论述了这两者之间的关系，并且尝试对为什么早期出现的编程语言都会很自然地采用（即使当时根本就还没有出现）按值传入参数的评估模型的原因进行探讨和分析。

## 引子

### 约定

1. `⟶` 读作 “规约为（reduce to，参见 [[Bare84, Chapter 3](../bibliography.md#Bare84)]）”，指定一步规约。
2. `→` 同一般记法，指定函数的类型映射关系。
    - `-ᵖ→` 指定这是一个偏函数。
    - **注释** 注意**区分** `⟶` 和 `→`。
3. `≡` 指称语法上的等价性。
    - 因为不能用 LaTex，就把 ≡ₐ 当成 ≡<sub style="font-size: 8.2px">α</sub> 吧。
4. `Λ` 用来表示 λ 演算项的全集，变体的全集则会添加对应的后缀，如 `ΛI` 为 λI 演算项的全集。
    - `Λ⁰` 表示全集上的[闭项（closed term）](#λᵥ-演算)。

### λ 演算

让我们首先定义原始的 λ 演算。

#### Definition 1

假设符号字母 `v`, `x`，`y`，`z`，... 是变量，而 `Variables` 是变量的域。
那么，λ 项的集合 Λ 可以递归地被定义为：

1. x ∈ Λ
2. T ∈ Λ ⇒ (λx.T) ∈ Λ
3. T₁, T₂ ∈ Λ ⇒ (T₁ T₂) ∈ Λ

为了使 calculus 具有实用意义，添加常量之后，使用 [`EBNF`](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form) 的定义如下：
**约定** 定义使用 `::=` 而不是 `=`。

Syntax (λ-calculus):

```text
c ∈ Constants
x ∈ Variables
T ::= c | x | λx.T | (TT) (Terms)
```

Substitution:

```text
c[x := N] = c
x[x := N] = N
y[x := N] = y, if x ≠ y
(T₁ T₂)[x := T₃] = (T₁[x := T₃])(T₂[x := T₃])
(λx.T₁)[y := T₂] = λx.T₁[y := T₂]
```

Schemata:

```text
λx.T ⟶ λy.T[x := y] (α-renaming)
(λx.T₁)T₂ ⟶ T₁[x := T₂] (β-reduction)
```

Equivalence:

```text
对 (λx.T₁)T₂ ⟶ T₁[x := T₂]
若 T₁ = x，则 T₁ = T₂

对 x, c
总有 x ≡ₐ x，c ≡ₐ c (α-equivalence)

对 λx.T₁ 与 λy.T₂
若 T₁[x := z] = T₂[x := z]，则 T₁ ≡ₐ T₂ (α-equivalence)

对 M ≡ₐ M₁，N ≡ₐ N₁，有 (M N) ≡ₐ (M₁ N₁) (α-equivalence)
```

**注释** 可通过 α-重命名（α-renaming）互相转化的项是 α-等价（α-equivalence）的。

### λᵥ 演算

λᵥ 演算和 λ 演算的主要区别在于，λv 演算在进一步规约时地区分了项（term）和 值（value）。值是排除应用的项。

#### Definition 2

Syntax (λᵥ-calculus):

**注释** `Constants` 包含函数常量与基本常量（比如数值）

```text
c ∈ Constants
x ∈ Variables
V ::= c | x | λx.T (Values)
T ::= V | (TT) (Terms)
```

Auxiliary functions:

```text
δ: Constants × Constants -ᵖ→ Λ⁰
```

**约定** 不包含自由变量的项是闭项，由 `Λ⁰` 表示。该集合可以形式化地表示，但为了避免篇幅冗余，不在此陈述，直接约定 `FV: Terms → Variables` 返回自由变量的集合。

**注释** 由于本文主要讨论 λ 演算之间的关系，故使用更简短的 δ 而非 `Constantly`。为了与原文保持一致，本文也未明确区分原始函数常量和数值常量。因此实质上 `Constants = PrimeFns ∩ Numbers`。
考虑到原始论文年代久远，出于记号的简便性与可读性，本文的大部分记号在尽可能只使用 markdown 功能的情况与 [[Bare84]](../bibliography.md#Bare84) 保持一致。因此，原文对于 λ 演算的替换采用的 `[y\x]T` 记法不被采纳。此外，与原文不同，这里显式地定义了 Values（排除了函数应用的项），从而表明 函数应用不是值 而不需要条件判断，让演绎规则更加明确。

Schemata:

```text
λx.T ⟶ λy.T[x := y] (α-renaming)
(λx.T)V ⟶ T[x := V] (β-reduction)
c₁c₂ ⟶ δ(c₁,c₂), if δ(c₁,c₂) is defined (δ-rule)
T₁T₂ ⟶ VT₂, if T₁ ⟶ V (call-by-value)
V₁T ⟶ V₁V₂, if T ⟶ V (call-by-value)
```

**注释** 当上下文不清晰时，规约关系会以下标指定属于 calculus 规则。如 `⟶ᵥ`。

**TODO** 添加更多论述。
