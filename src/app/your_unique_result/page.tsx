"use client"
import React, { useState } from 'react'
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import YouTube from 'react-youtube';

export default function YourUniqueResult() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const [showFinalContent, setShowFinalContent] = useState(false);

  const text = "おみくじの結果は「凶」でした\n#いらいらおみくじ";
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(text)}`;

  const youtubeOptions = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,      // 自動再生をオンにする
      // controls: 0,      // プレーヤーのコントロールを非表示にする
      // disablekb: 1,     // キーボード操作を無効にする
      // fs: 0,            // 全画面表示ボタンを非表示にする
      // modestbranding: 1,// YouTubeロゴを最小限にする
      // rel: 0,           // 関連動画を表示しない
      // showinfo: 0       // 動画の情報を表示しない
    },
  };

  const onYouTubeReady = (event) => {
    // YouTube APIの準備ができたら自動再生
    event.target.playVideo();
  };

  const onYouTubeEnd = () => {
    setVideoEnded(true);
    setOpenFirstModal(true);
  };

  const handleFirstModalClose = () => {
    setOpenFirstModal(false);
    setOpenSecondModal(true); // 2つ目のモーダルを開く
  };

  const handleSecondModalClose = () => {
    setOpenSecondModal(false);
    setShowFinalContent(true); // 最終結果を表示
  };

  return (
    <div>
      {!showFinalContent && (
        <Box sx={{
          display: 'flex',       // Flexboxレイアウトを使用
          justifyContent: 'center', // 水平方向の中央揃え
          alignItems: 'center',     // 垂直方向の中央揃え
          height: '80vh',          // ビューポートの高さを100%に設定
          flexDirection: 'column',
        }}>
          <Typography sx={{ textAlign: 'center' }}>
            動画を視聴し終えた後に結果が表示されます。
          </Typography>
          <Box sx={{
            position: 'relative',
            paddingBottom: '56.25%', // 16:9のアスペクト比
            width: '100%',
            height: 0,
            overflow: 'hidden',
            '& iframe': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }
          }}>
            <YouTube
              videoId="RNduq3nsh-E"
              opts={youtubeOptions}
              onReady={onYouTubeReady}
              onEnd={onYouTubeEnd}
            />
          </Box>
        </Box>
      )}

      <Dialog open={openFirstModal} onClose={handleFirstModalClose}>
        <DialogTitle>本当に結果を見ますか？</DialogTitle>
        <DialogContent>この先に行くとあなたの運勢が決まってしまいますよ、、、？</DialogContent>
        <DialogActions>
          <Button onClick={handleFirstModalClose}>見る</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSecondModal} onClose={handleSecondModalClose}>
        <DialogTitle>本当の本当にいいんですね？</DialogTitle>
        <DialogContent>この選択があなたの運命を決めることになります。</DialogContent>
        <DialogActions>
          <Button onClick={handleSecondModalClose}>運勢を確認</Button>
        </DialogActions>
      </Dialog>

      {showFinalContent && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          height: '80vh',
        }}>
          <Typography variant="h2" component="div" sx={{ textAlign: 'center' }}>
            お前だけ凶（笑）
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.open(tweetUrl, '_blank')}
            sx={{ mt: 2 }}
          >
            結果をXで共有
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.open(lineUrl, '_blank')}
            sx={{
              mt: 2,
              backgroundColor: 'green', // ボタンの背景色を緑色に設定
              '&:hover': {
                backgroundColor: 'darkgreen' // ホバー時の背景色を暗い緑色に設定
              }
            }}
          >
            結果をLINEで共有
          </Button>
        </Box>
      )}
    </div>
  );
}
