# Портальный архетип приложения | Дизайн-система Consta

В этом репозитории лежит пример портала из двух частей: родительского приложения (host) и удаленного (remote), которое подгружается в родительское.

Внутри — готовая структура файлов, настроены правила сборки и подключена [дизайн-система Consta](https://github.com/consta-design-system/uikit). Примеры страниц обоих приложений собраны с помощью дизайн-системы.

## Кому пригодится

Этот шаблон подходит для приложений, состоящих из множества независимых частей, которые могут работать как самостоятельно, так и в составе других приложений. Например, так обычно связаны мессенджер и лента в социальной сети.

## Какие задачи решает

Упрощает совместную работу над сложным приложением и тестирование изменений:

* Приложение разбивается на независимые модули, которые подгружаются по мере необходимости.
* Можно подключить к разработке одновременно несколько команд, при этом степень изоляции их работы будет такой, что ни одна из команд не сможет сломать весь проект.
* Код модулей находится в отдельных репозиториях (это значит, что не нужно собирать все приложение, достаточно передать релиз-инженерам один модуль).
* Ошибки, которые могут возникнуть в модулях, не повлияют на доступность всего приложения — они будут изолированы, и, если что-то пойдет не так, модуль просто не загрузится.
* Найти причину ошибки и ее автора тоже станет проще, потому что история изменений в коде будет намного чище.
* Тестировщики в такой системе не тратят время на полные регрессы, потому что тестироваться будет конкретный модуль, а не все приложение.

## Как установить

```
git clone git@github.com:consta-design-system/portal-template.git
```

## Как запустить локально

При локальном запуске строго соблюдайте последовательность — сперва remote, после host. Это нужно для того, чтобы родительское приложение могло найти дочерние.

### Удаленное приложение (remote)

1. Перейдите в директорию:

```sh
cd tutorial-video
```

2. Установите зависимости:

```sh
npm install
```

3. Запустите приложение:

```sh
npm start
```

### Родительское приложение (host)

1. Перейдите в директорию `tutorial`.
2. Повторите шаги выше.

Так у вас появятся 2 процесса: на порту 3001 будет корневое приложение, а на 3006 удаленное.

Порты задаются в самих приложениях, а их маппинг находится в файле `__mocks__/remotes.ts`

> В последних версиях Safari видео с Youtube не подгрузится, это связано с ограничением запуска на localhost. <br />
> Как вариант, можете сделать маппинг хостов в /etc/hosts, но это не так критично для демо...

## Как добавить новое приложение (remote)

Если вы захотите добавить новый remote, поправьте следующие файлы:

1. `./__mocks__/remotes.ts` — маппниг хостов. Используется, чтобы найти ваши приложения на этапе разработки.
2. `./src/remotes.ts` — перечислите все remote's, с которыми будет работать ваш контейнер.
3. `./webpack.config.js` — здесь задается уникальный порт, по которому родительское приложение сможет вас найти.

Если у вас добавится новая зависимость, которая пересекается с другими приложениями, укажите ее в конфиге — это поможет исключить дубликаты.

## Механика работы

1. Webpack собирает 2 независимых приложения по схеме [Module Federation](https://webpack.js.org/concepts/module-federation/) (пояснительный пример подгрузки бандлов смотрите [здесь](https://github.com/monolithed/module-federation-loader)).
2. Имя сборки задается в конфиге ModuleFederationPlugin.
3. Артефакты сборки сохраняются в файл `assets-manifest.json`.
4. Как только пользователь запросит страницу, сервер должен вернуть файл `assets-manifest.json`.
5. Из полученных данных динамически [создается тег](https://github.com/monolithed/module-federation-loader/blob/master/src/addScript.ts) `script`.
6. После исполнения [скрипта](https://github.com/monolithed/module-federation-loader/blob/master/src/remoteLoader.ts) отрисовывается компонент.

> Поскольку имена бандлов попадают в глобальное пространство имен, старайтесь давать им уникальные названия (по умолчанию используется название пакета).

Обращение к удаленными компонентам происходит так:

```tsx
import React, {FunctionComponent} from 'react';
import {RemoteLoader} from '../../components/RemoteLoader';
import {Remotes} from '../../bundles';

export const Video: FunctionComponent<any> = () => {
    return (
        <RemoteLoader bundle={Remotes.TUTORIAL} module="./Video">
            <RemoteLoader.Component />
        </RemoteLoader>
    );
};
```

## Система именований

Настоятельно рекомендуется использовать следующую систему именований:

1. `<project>`
2. `<project>-<stream>`

## Сборка на стенде

1. Разнесите host и remote's на два независимых репозитория.
2. Соберите сборки и положите их на CDN.
3. Создайте эндпоинт, который будет возвращать данные из `assets-manifest.json` (по типу запроса `/api/workspace/bundle`).
4. Перед каждым обращением к стриму запрашиваейте у сервера артефакты сборки и передавайте их в RemoteLoader.

## Лицензия

MIT
