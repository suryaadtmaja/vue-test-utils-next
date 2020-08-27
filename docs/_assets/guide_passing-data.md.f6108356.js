import{g as n,f as s,z as a}from"./common-eb2a78a6.js";const t='{"title":"Passing Data to Components","frontmatter":{},"headers":[{"level":2,"title":"The Password Component","slug":"the-password-component"},{"level":2,"title":"Using props to set a minimum length","slug":"using-props-to-set-a-minimum-length"},{"level":2,"title":"Using setProps","slug":"using-setprops"},{"level":2,"title":"Conclusion","slug":"conclusion"}],"lastUpdated":1598528079987.2156}';var o={};const p=a('<h1 id="passing-data-to-components"><a class="header-anchor" href="#passing-data-to-components" aria-hidden="true">#</a> Passing Data to Components</h1><p>Vue Test Utils provides several ways to set data and props on a component, to allow you to fully test the component&#39;s behavior in different scenarios.</p><p>In this section, we explore the <code>data</code> and <code>props</code> mounting options, as well as <code>VueWrapper.setProps()</code> to dynamically update the props a component receives.</p><h2 id="the-password-component"><a class="header-anchor" href="#the-password-component" aria-hidden="true">#</a> The Password Component</h2><p>We will demonstrate the above features by building a <code>&lt;Password&gt;</code> component. This component verifies a password means certain criteria, such as length and complexity. We will start with the following and add features, as well as tests to make sure the features are working correctly:</p><div class="language-js"><pre><code><span class="token keyword">const</span> Password <span class="token operator">=</span> <span class="token punctuation">{</span>\n  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\n    &lt;div&gt;\n      &lt;input v-model=&quot;password&quot;&gt;\n    &lt;/div&gt;\n  </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>\n  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      password<span class="token operator">:</span> <span class="token string">&#39;&#39;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>The first requirement we will add is a minimum length.</p><h2 id="using-props-to-set-a-minimum-length"><a class="header-anchor" href="#using-props-to-set-a-minimum-length" aria-hidden="true">#</a> Using <code>props</code> to set a minimum length</h2><p>We want to reuse this component in all our projects, each of which may have different requirements. For this reason, we will make the <code>minLength</code> a <strong>prop</strong> which we pass to <code>&lt;Password&gt;</code>:</p><p>We will show an error is <code>password</code> is less than <code>minLength</code>. We can do this by creating an <code>error</code> computed property, and conditionally rendering it using <code>v-if</code>:</p><div class="language-js"><pre><code><span class="token keyword">const</span> Password <span class="token operator">=</span> <span class="token punctuation">{</span>\n  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\n    &lt;div&gt;\n      &lt;input v-model=&quot;password&quot;&gt;\n      &lt;div v-if=&quot;error&quot;&gt;{{ error }}&lt;/div&gt;\n    &lt;/div&gt;\n  </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>\n  props<span class="token operator">:</span> <span class="token punctuation">{</span>\n    minLength<span class="token operator">:</span> <span class="token punctuation">{</span>\n      type<span class="token operator">:</span> Number\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  computed<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>password<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>minLength<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Password must be at least </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>minLength<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> characters.</span><span class="token template-punctuation string">`</span></span>\n      <span class="token punctuation">}</span>\n      <span class="token keyword">return</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>To test this, we need to set the <code>minLength</code>, as well as a <code>password</code> that is less than that number. We can do this using the <code>data</code> and <code>props</code> mounting options. Finally, we will assert the correct error message is rendered:</p><div class="language-js"><pre><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;renders an error if length is too short&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Password<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    props<span class="token operator">:</span> <span class="token punctuation">{</span>\n      minLength<span class="token operator">:</span> <span class="token number">10</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token punctuation">{</span>\n        password<span class="token operator">:</span> <span class="token string">&#39;short&#39;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Password must be at least 10 characters&#39;</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>Writing a test for a <code>maxLength</code> rule is left as an exercise for the reader! Another way to write this would be using <code>setValue</code> to update the input with a password that is too short. You can learn more in <a href="/guide/forms.html">Forms</a>.</p><h2 id="using-setprops"><a class="header-anchor" href="#using-setprops" aria-hidden="true">#</a> Using <code>setProps</code></h2><p>Sometimes you may need to write a test for a side effect of a prop changing. This simple <code>&lt;Show&gt;</code> component renders a greeting if the <code>show</code> prop is <code>true</code>.</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>show<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ greeting }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  props<span class="token operator">:</span> <span class="token punctuation">{</span>\n    show<span class="token operator">:</span> <span class="token punctuation">{</span>\n      type<span class="token operator">:</span> Boolean<span class="token punctuation">,</span>\n      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token boolean">true</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      greeting<span class="token operator">:</span> <span class="token string">&#39;Hello&#39;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><p>To test this fully, we might want to verify that <code>greeting</code> is rendered by default. We are able to update the <code>show</code> prop using <code>setProps()</code>, which causes <code>greeting</code> to be hidden:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>\n<span class="token keyword">import</span> Show <span class="token keyword">from</span> <span class="token string">&#39;./Show.vue&#39;</span>\n\n<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;renders a greeting when show is true&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Show<span class="token punctuation">)</span>\n  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">)</span>\n\n  <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span><span class="token function">setProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span> show<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>We also use the <code>await</code> keyword when calling <code>setProps()</code>, to ensure that the DOM has been updated before the assertions run.</p><h2 id="conclusion"><a class="header-anchor" href="#conclusion" aria-hidden="true">#</a> Conclusion</h2><ul><li>use the <code>props</code> and <code>data</code> mounting options to pre-set the state of a component.</li><li>Use <code>setProps()</code> to update a prop during a test.</li><li>Use the <code>await</code> keyword before <code>setProps()</code> to ensure the Vue will update the DOM before the test continues.</li><li>Directly interacting with your component can give you greater coverage. Consider using <code>setValue</code> or <code>trigger</code> in combination with <code>data</code> to ensure everything works correctly.</li></ul>',22);o.render=function(a,t,o,e,c,l){return s(),n("div",null,[p])};export default o;export{t as __pageData};
