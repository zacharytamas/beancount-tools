import { StringLiteral } from '../../nodes/StringLiteral';

test('can be constructed correctly', () => {
  expect(StringLiteral('Test')).toMatchObject({ type: 'StringLiteral', value: 'Test' });
  expect(StringLiteral({ value: 'Test' })).toMatchObject({ type: 'StringLiteral', value: 'Test' });
});
