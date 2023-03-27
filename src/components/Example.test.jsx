import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Conversions from './Conversions';
import Rates from './Rates';
import NavBarComp from './NavBarComp';

describe('<Conversion />', () => {
	test('App mounts properly', () => {
		const wrapper = render(<Conversions />);
		expect(wrapper).toBeTruthy();
	});
});

describe('<Rates />', () => {
	test('App mounts properly', () => {
		const wrapper = render(<Rates />);
		expect(wrapper).toBeTruthy();
	});
});

describe('<NavBarComp />', () => {
	test('App mounts properly', () => {
		const wrapper = render(<NavBarComp />);
		expect(wrapper).toBeTruthy();
	});
});
