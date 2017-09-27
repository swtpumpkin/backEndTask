[![Build Status](https://travis-ci.org/seungha-kim/wpsn-testability.svg?branch=master)](https://travis-ci.org/seungha-kim/wpsn-testability)

# WPSN Testability

테스트 용이성(Testability)는 소프트웨어에 대한 테스트가 얼마나 쉬운지를 말하는 용어입니다.
테스트 용이성이 높을 수록 소프트웨어의 설계가 유연하고 컴포넌트 간 결합도가 낮기 때문에, 좋은 설계라고 할 수 있습니다.

이번 프로젝트에서는 Node.js 기반 소프트웨어를 테스트하는 방법과, Testability를 고려한 설계 방법, 지속적인 통합(Continuous Integration, CI)를 다룹니다.

- [assert 내장 모듈](https://nodejs.org/api/assert.html)
- [Mocha test framework](https://mochajs.org/)
- [SuperAgent](http://visionmedia.github.io/superagent/) & [SuperTest](https://github.com/visionmedia/supertest)
- [Testability]를 높이기 위한 [의존성 주입](https://ko.wikipedia.org/wiki/%EC%9D%98%EC%A1%B4%EC%84%B1_%EC%A3%BC%EC%9E%85)과 [Sinon](http://sinonjs.org/)
- [지속적인 통합](https://ko.wikipedia.org/wiki/%EC%A7%80%EC%86%8D%EC%A0%81_%ED%86%B5%ED%95%A9) & [Travis CI](https://travis-ci.org/)
