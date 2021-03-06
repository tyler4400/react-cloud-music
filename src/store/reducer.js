import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index'
import { reducer as singerReducer } from '../application/Singers/store/index'
import { reducer as rankReducer } from '../application/Rank/store/index'
import { reducer as albumReducer } from '../application/Album/store/index'
import { reducer as singerInfoReducer } from '../application/Singer/store/index'
import { reducer as PlayerReducer } from '../application/Player/store/index'

export default combineReducers({
    // 之后开发具体功能模块的时候添加reducer
    recommend: recommendReducer,
    singers: singerReducer,
    rank: rankReducer,
    album: albumReducer,
    singerInfo: singerInfoReducer,
    player: PlayerReducer,
});
