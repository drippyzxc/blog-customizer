import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useRef, useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator/Separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type Props = {
	updateOptionStyle: (options: ArticleStateType) => void;
	optionStyle: ArticleStateType;
};

export const ArticleParamsForm = (props: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [options, setOptions] = useState({ ...props.optionStyle });

	const ref = useRef<HTMLDivElement>(null);

	function updateFontFamily(option: OptionType) {
		setOptions({ ...options, fontFamilyOption: option });
	}

	function updateFontSize(option: OptionType) {
		setOptions({ ...options, fontSizeOption: option });
	}

	function updateFontColor(option: OptionType) {
		setOptions({ ...options, fontColor: option });
	}

	function updateBackgroundColor(option: OptionType) {
		setOptions({ ...options, backgroundColor: option });
	}

	function updateContentWidth(option: OptionType) {
		setOptions({ ...options, contentWidth: option });
	}

	function toggleMenu() {
		setIsMenuOpen(!isMenuOpen);
	}

	function resetForm() {
		props.updateOptionStyle(defaultArticleState);
		setOptions(defaultArticleState);
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		props.updateOptionStyle(options);
	}

	useOutsideClickClose({
		isOpen: isMenuOpen,
		onChange: setIsMenuOpen,
		rootRef: ref,
	});

	return (
		<>
			<div ref={ref}>
				<ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isMenuOpen,
					})}>
					<form onSubmit={handleSubmit} className={styles.form}>
						<Text as={'h2'} size={31} weight={800} uppercase>
							Задайте параметры
						</Text>

						<Select
							options={fontFamilyOptions}
							selected={options.fontFamilyOption}
							title='Шрифт'
							onChange={updateFontFamily}
						/>

						<RadioGroup
							name={'radio'}
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={options.fontSizeOption}
							onChange={updateFontSize}
						/>

						<Select
							options={fontColors}
							selected={options.fontColor}
							title='Цвет шрифта'
							onChange={updateFontColor}
						/>

						<Separator />

						<Select
							options={backgroundColors}
							selected={options.backgroundColor}
							title='Цвет фона'
							onChange={updateBackgroundColor}
						/>

						<Select
							options={contentWidthArr}
							selected={options.contentWidth}
							title='Ширина контента'
							onChange={updateContentWidth}
						/>

						<div className={styles.bottomContainer}>
							<Button
								onClick={resetForm}
								title='Сбросить'
								htmlType='reset'
								type='clear'
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
