const { createApp } = require('vue');
const VueLineClamp = require('..');
console.log(VueLineClamp);

const app = createApp({
  data: function() {
    return { lines: 2 };
  },
  template: `
    <div>
      <span v-line-clamp="lines">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Minima accusamus qui est libero eum enim fuga aspernatur non,
        tenetur temporibus quae laudantium iste dicta nesciunt eveniet eaque praesentium?
        Architecto, maiores?
      </span>
    </div>
  `,
  mounted() {
    runTests()
  },
});

app.use(VueLineClamp, {
  importCss: true
});

const el = document.createElement("div");
el.setAttribute("id","app");
document.body.appendChild(el);
app.mount('#app')

function runTests() {
  test('CSS class is applied', () => {
    const elem = document.body.querySelector('span')
    expect(elem.classList.contains('vue-line-clamp'))
      .toBe(true)
  })

  test('CSS styles are imported in the DOM', () => {
    expect(document.head.querySelector('#vue-line-clamp'))
      .toBeTruthy()
  })
}
