# λ 演算 vs. λᵥ 演算

## 概要

原始的 λ 演算由 A. Church 提出，其按名称传入（call-by-name）参数。而 G. D. Plotkin 首次系统阐述的 λᵥ 演算按值传入（call-by-value）参数。
本文论述了这两者之间的关系，并且尝试对为什么早期出现的编程语言都会很自然地采用（即使当时根本就还没有出现）按值传入参数的评估模型的原因进行探讨和分析。

## 引子

### 约定

→ 读作 “规约为（reduce to，参见 [[Bare84, Chapter 3](../bibliography.md#Bare84)]）”，指定一步规约。
≡ 指称语法上的等价性。

### λ 演算

让我们首先定义原始的 λ 演算。

#### Definition 1

假设 `Variables` 是符号字母 `x`，`y`，`z`，... 的域.

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
λx.T → λy.T[x := y] (α-renaming)
(λx.T₁)T₂ → T₁[x := T₂] (β-reduction)
```

Equivalence:

```text
对 (λx.T₁)T₂ → T₁[x := T₂]
若 T₁ = x，则 T₁ = T₂

对 x, c
总有 x ≡ₐ x，c ≡ₐ c (α-equivalence)

对 λx.T₁ 与 λy.T₂
若 T₁[x := z] = T₂[x := z]，则 T₁ ≡ₐ T₂ (α-equivalence)

对 M ≡ₐ M₁，N ≡ₐ N₁，有 (M N) ≡ₐ (M₁ N₁) (α-equivalence)
```

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
δ: Constants × Constants -ᵖ→ Closed Values
```

**注释** 由于本文主要讨论 λ 演算之间的关系，故使用更简短的 δ 而非 `Constapply`。为了与原文保持一致，本文也未明确区分原始函数常量和数值常量。因此实质上 `Constants = PrimeFns ∩ Numbers`。
考虑到原始论文年代久远，出于记号的简便性与可读性，本文的大部分记号在尽可能只使用 markdown 功能的情况与 [[Bare84]](../bibliography.md#Bare84) 保持一致。因此，原文对于 λ 演算的替换采用的 `[y\x]T` 记法不被采纳。此外，与原文不同，这里显式地定义了 Values（排除了函数应用的项），从而表明 函数应用不是值 让演绎规则更加明确。

Schemata:

```text
λx.T → λy.T[x := y] (α-renaming)
(λx.T)V → T[x := V] (β-reduction)
(c₁c₂) → δ(c₁,c₂), if δ(c₁,c₂) is defined (δ-rule)
T₁T₂ → VT₂, if T₁ → V
V₁T → V₁V₂, if T → V
```

**注释** 当上下文不清晰时，规约关系会被以下标指定使用的规则。如 `→ᵥ`。

**TODO** 添加更多论述。
