# Codex 主生成词（直接复制给 Codex）

请基于这个整理后的 `MBTI-codex-package-final` 素材包，重构/实现《与神对话》移动端网页原型。

## 一、你必须先阅读
请先阅读以下文件，不要直接改代码：

1. `00_docs/README_FOR_CODEX.md`
2. `00_docs/MBTI-codex-package-Document-Description.txt`
3. `00_docs/与神对话_Codex制作需求文档_最终流程版_修正版.docx`
4. `00_docs/与神对话_Codex提交规范文档_最终版_修正版.docx`
5. `00_docs/与神对话_页面导出保存与命名规范_最终版.docx`
6. `11_data/asset_manifest.csv`
7. `11_data/available_asset_status.csv`
8. `11_data/oracle_to_save_mapping.csv`

如果文档与本条指令冲突，以本条指令和 README_FOR_CODEX.md 为准。

## 二、页面流程必须严格按此实现

1. 首页：与神对话
   - 使用 `01_ui_reference/01_home/01-home-reference.png` 作为视觉参考。
   - 首页开场动效参考 `12_motion_reference/01-home-opening-motion.mp4`。
   - 神仙环绕素材在 `02_home_assets/deities/`。
   - 页面打开后：神仙依次出现 → 标题渐显 → 开始按钮出现。
   - 点击开始进入 i神/e神入口页。

2. i神/e神入口页
   - 使用 `01_ui_reference/02_entry/02-entry-reference.png`。
   - 两个入口是“册子”，不是符纸。
   - 册子素材在 `03_entry_assets/booklets/`。
   - 点击 i神进入 i神 MBTI 选择页；点击 e神进入 e神 MBTI 选择页。
   - 点击册子时轻微放大并轻微晃动。

3. i神 MBTI 选择页
   - 使用 `01_ui_reference/03_i_mbti_select/03-i-mbti-select-reference.png`。
   - i神 MBTI 牌子素材在 `04_mbti_select_assets/i_group/cards/`。
   - 牌子进入方式：错落出现、从下微微弹起后定住。
   - 点击某个 MBTI：该牌子轻微放大，然后短闪屏过渡到神明详情确认页。

4. e神 MBTI 选择页
   - 使用 `01_ui_reference/04_e_mbti_select/04-e-mbti-select-reference.png`。
   - e神 MBTI 牌子素材在 `04_mbti_select_assets/e_group/cards/`。
   - 交互同 i神页。

5. 神明详情确认页
   - 使用 `01_ui_reference/05_deity_detail/05-deity-detail-reference.png`。
   - 神明详情卡素材在 `05_deity_detail_assets/cards/`。
   - 这是叠卡吊牌页：主卡清晰，后两张卡虚化/简化，提示可左右滑。
   - 左右滑动顺序读取 `11_data/deity_order.csv`。
   - 点击“选择TA/选择祂”进入提问页。
   - 右上角八边形是返回上一级，不是返回首页。

6. 提问页
   - 参考 `01_ui_reference/06_question/06-question-empty-reference.png` 和 `06-question-filled-reference.png`。
   - 背景/神龛/输入框/按钮素材在 `06_question_page_assets/`。
   - 页面淡入即可。
   - 输入框空状态有灰色占位文字；用户输入后显示用户问题。
   - 未输入时确认按钮不能进入下一页。

7. 签文指示页
   - 使用 `01_ui_reference/07_oracle_paper/07-oracle-paper-reference.png`。
   - 注意：本版本签文纸不是代码渲染竖排文字，而是使用已经排好版的图片预设。
   - 黄色签文预设在 `07_oracle_page_assets/paper_presets/{MBTI}/`。
   - 当前 MBTI 随机抽取 01/02/03 其中一支签文纸。
   - 出现动画：签纸从下往上窜入，轻微过冲，再回落定格；按钮稍晚淡入。
   - 按钮：认可、我要验牌。
   - 点击认可：进入最终保存卡页面，使用与当前签文相同 MBTI 和相同编号的保存卡。
   - 点击我要验牌：进入茭杯动画页。

8. 茭杯动画页 / 虔诚中
   - 使用 `01_ui_reference/08_cup_loading/08-cup-loading-reference.png`。
   - 动效参考 `12_motion_reference/08-cup-toss-motion.mp4`。
   - 素材在 `08_cup_animation_assets/`。
   - 动画结束后进入茭杯结果页。

9. 茭杯结果页
   - 参考 `01_ui_reference/09_cup_result/` 中的三个结果参考图。
   - 结果图形在 `09_cup_result_assets/result_graphics/`。
   - 三种结果：阳杯、阴杯、笑杯。
   - 概率遵循原茭杯逻辑：阳杯 50%，阴杯 25%，笑杯 25%。
   - 无论结果是阳杯/阴杯/笑杯，都显示两个按钮：认可、再来一次。
   - 点击认可：进入最终保存卡页面，使用当前签文对应的保存卡。
   - 点击再来一次：保留当前神明与用户问题，重新抽取一支新的签文，回到签文指示页。尽量避免连续抽到同一编号。
   - 再来一次不是重新验同一支签，也不是回到提问页。

10. 最终保存卡页面
    - 使用 `01_ui_reference/10_save_card/10-save-card-reference.png`。
    - 保存卡预设在 `10_save_page_assets/save_presets/{MBTI}/`。
    - 显示与当前抽到的签文纸相同 MBTI + 相同编号的保存卡。
    - 动效参考 `12_motion_reference/10-save-card-drop-motion.mp4`：粉色吊牌从上方轻轻落下，轻微晃动后定格。
    - “长按保存图片”提示在动画后淡入。

## 三、实现要求
- 设计基准：393 × 852 px。
- mobile-first，桌面端居中显示，最大宽度不超过 430px。
- 固定文字如果已是图片，直接使用图片，不要自行替换字体。
- 普通输入文字用代码渲染。
- 不要导入或索要字体文件。
- 如果缺少某个 MBTI 的下游素材，不要擅自生成视觉图；使用占位并在最终 summary 中列出缺失。
- 每个按钮要有轻微点击反馈。
- 八边形按钮统一为返回上一级。

## 四、交付时请输出
1. 修改 summary
2. 修改文件列表
3. 每个页面/交互的完成情况
4. 缺失素材清单
5. 如何本地运行和预览
6. PR 描述
