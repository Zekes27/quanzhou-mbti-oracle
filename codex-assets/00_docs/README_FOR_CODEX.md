# MBTI-codex-package-final

这是整理后的《与神对话》Codex 最终交付素材包。

## 使用顺序
1. 先读 `00_docs/README_FOR_CODEX.md`
2. 再读 `00_docs/CODEX_MASTER_PROMPT.md`
3. 用 `11_data/asset_manifest.csv` 查看每个文件的最终路径、原始路径、用途说明。
4. 用 `11_data/available_asset_status.csv` 查看哪些 MBTI 已有完整下游素材。

## 重要修正
- `再来一次` 不是重新验同一支签，而是：保留当前神明与用户问题，重新随机抽一支新的签文，回到签文指示页。
- 07 签文页与 10 保存页均使用已经做好的图片预设，不由代码重新竖排渲染签文。
- 右上角八边形按钮统一是“返回上一级”，不是“返回首页”。
- 设计基准尺寸为 393 × 852 px；网页最大宽度不超过 430 px，大屏居中显示。

## 当前素材完整度提醒
当前包内 03/04 的 MBTI 选择牌子较完整；但 05 神明详情、06 提问页神龛、07 签文预设、10 保存卡预设目前主要覆盖 8 个 MBTI：ENFJ、ENTJ、ENTP、ESFJ、INFJ、INFP、INTJ、INTP。其余 MBTI 缺少完整下游素材，请 Codex 使用占位或在 summary 中明确列出缺失，不能擅自生成未经提供的视觉图。
