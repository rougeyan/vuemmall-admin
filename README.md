# Ant Design Pro

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).



### 引入 tabs组件
[Ant Design Pro Tabs](https://gitee.com/Onces/ant-design-pro-tabs)
[Ant Tabs](https://kuhami.github.io/KroInterview/antTabs.html#/AntTabs?id=%e5%bc%95%e5%85%a5-ant-tabs)
[其他](https://segmentfault.com/q/1010000015832818)

###  state 写法
[React的state写在constructor里面和直接写state有什么区别？？](https://segmentfault.com/q/1010000018428353)

### 常规解构用法

```js
const { status, type: loginType } = userLogin; // 通过model获取的状态

// status 是变量
// type 利用loginType作为变量
console.log(status)
console.log(loginType)



const {
    route = {
      routes: [],
    },
  } = props;
  console.log(route) // 结构变量 route 且赋予默认值{routes: []}
  const { routes = [] } = route;
  console.log(routes) // 从上面结构的route 又取解构出 变量routes
```

### context 使用
[Context](https://react.docschina.org/docs/context.html)
```js
import LoginContext from './LoginContext';
<LoginContext.Provider/>
```


### dispatch

```jsx
const BasicLayout = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
```


### 后台管理使用ant design pro table 的注意事项

默认使用request payload加载参数

使用form data

在`utils request.js`下设置
```js
const request = extend({
  errorHandler,
  requestType: 'form', // 使用form data
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});
```


### render: (_, record) => ())

### Form 表单 有值的情况先如何展示?


### 
[解决ant design出现:'Instance created by `useForm` is not connect to any Form element.警告的问题](https://blog.csdn.net/weixin_43379230/article/details/104986688)


### Form 及 Modal 配合使用

使用ref 调用组件instance;

formRef.current.submit()


### 哈哈