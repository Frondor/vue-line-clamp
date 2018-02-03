const Vue = require('vue/dist/vue');
const VueLineClamp = require('..');

Vue.use(VueLineClamp, {
  importCss: true
});


const vm = new Vue({
  data: { lines: 2 },
  template: `
    <div>
      <span v-line-clamp="lines">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Minima accusamus qui est libero eum enim fuga aspernatur non,
        tenetur temporibus quae laudantium iste dicta nesciunt eveniet eaque praesentium?
        Architecto, maiores?
      </span>
    </div>
  `
}).$mount()

const elem = vm.$el.querySelector('span')

test('CSS class is applied', () => {
  expect(elem.classList.contains('vue-line-clamp'))
    .toBe(true)
})

test('CSS styles are imported in the DOM', () => {
  expect(document.head.querySelector('#vue-line-clamp'))
    .toBeTruthy()
})